import * as request from 'supertest';
import { LocationSearchHistoryEntity } from '../../../databases/entities/LocationSearchHistory.entity';
import { testingApp } from '../../../test/setup-e2e';

describe.only('E2E testing report module', () => {
  it('[FWM-209] - it should post "/query-report/log-history" - Successfully', async () => {
    await request(testingApp.app.getHttpServer())
      .post('/query-report/log-history')
      .set('Api-Key', 'test')
      .send({
        dateTime: '2024-01-14T10:56:53.380Z',
        location: 'location A',
      })
      .expect(201);

    const searchHistoryRepo = testingApp.dataSource.getRepository(
      LocationSearchHistoryEntity,
    );

    const count = await searchHistoryRepo.count();
    expect(count).not.toEqual(0);
  });
});
