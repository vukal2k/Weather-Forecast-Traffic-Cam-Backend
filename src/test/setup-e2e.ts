import { db_config } from '@/utils/common-typeorm-config';
import { ConfigModule } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as killPortProcess from 'kill-port-process';
import * as pidFromPort from 'pid-from-port';
import { of } from 'rxjs';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { LocationSearchHistoryEntity } from '../databases/entities/LocationSearchHistory.entity';
import { ReportModule } from '../modules/report/report.module';
import { TrafficImageModule } from '../modules/traffic-image/traffic-image.module';
import { ResponseInterceptor } from '../utils/interceptors/response.interceptor';
import { setupInMemoryDataSource } from './in-memory-datasource';
import { createInMemRedisApp } from './in-memory-redis';

export const createApp = async () => {
  const dataSource = inMemPostgres.ds;

  const fixture: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule, AppModule, TrafficImageModule, ReportModule],
  })
    .overrideProvider(DataSource)
    .useValue(dataSource)
    .compile();

  const app = fixture.createNestApplication();
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  await app.listen(5999);
  await app.init();

  return { app, dataSource };
};

export class MockUtils {
  static setMock(mock: unknown): any {
    return mock as any;
  }
}

export const mockedClientProxy = {
  connect: jest.fn().mockImplementation(() => of({})),
  send: jest.fn().mockImplementation(() => of({})),
};

export let testingApp;
export let redis_url;
export let inMemRedis;
export let inMemPostgres: any;

export const setupTest = async () => {
  beforeAll(async () => {
    inMemRedis = await createInMemRedisApp(2999);
    inMemPostgres = await setupInMemoryDataSource(
      {
        ...db_config,
        entities: [LocationSearchHistoryEntity],
      },
      [],
    );
    redis_url = inMemRedis.url;

    testingApp = await createApp();
  });

  afterAll(async () => {
    await Promise.all([testingApp?.app?.close(), inMemPostgres?.ds?.close()]);

    setTimeout(async () => {
      await forceKillPorts();
    });
  });

  async function forceKillPorts() {
    await pidFromPort(5999)
      .then(async () => 5999)
      .then(killPortProcess)
      .catch((error) => {
        console.error(error);
      });
  }
};
