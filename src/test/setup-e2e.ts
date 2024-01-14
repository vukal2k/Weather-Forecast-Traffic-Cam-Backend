import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as killPortProcess from 'kill-port-process';
import * as pidFromPort from 'pid-from-port';
import { AppModule } from '../app.module';
import { ResponseInterceptor } from '../utils/interceptors/response.interceptor';
import { createInMemRedisApp } from './in-memory-redis';

export const createApp = async () => {
  const fixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = fixture.createNestApplication();
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  await app.listen(5999);
  await app.init();

  return { app };
};

export class MockUtils {
  static setMock(mock: unknown): any {
    return mock as any;
  }
}

export let testingApp;
export let redis_url;
export let inMemRedis;

export const setupTest = async () => {
  beforeAll(async () => {
    console.log('test start');
    testingApp = await createApp();
    inMemRedis = await createInMemRedisApp(2999);
    redis_url = inMemRedis.url;
  });

  afterAll(async () => {
    console.log('test end');

    testingApp?.app?.close();
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
