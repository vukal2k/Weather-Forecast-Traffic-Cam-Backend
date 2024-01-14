import * as request from 'supertest';
import { mockRedisFactory } from '../../../test/in-memory-redis';
import { testingApp } from '../../../test/setup-e2e';

describe.only('E2E testing traffic-image', () => {
  it('[FWM-209] - it should execute "/locations" - Successfully', async () => {
    await request(testingApp.app.getHttpServer())
      .get('/locations')
      .set('Api-Key', 'test')
      .expect(200);

    const redisService = await mockRedisFactory();
    const cachedData = await redisService.get('all');

    expect(cachedData).not.toBeNull();
  });
});
