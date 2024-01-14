import * as killPortProcess from 'kill-port-process';
import * as pidFromPort from 'pid-from-port';
import RedisMemoryServer from 'redis-memory-server';
import { CacheService } from '../utils/modules/cache/cache.service';
import { redis_url } from './setup-e2e';

export const mockRedisFactory = async () => {
  const cacheService = new CacheService(redis_url);
  return cacheService;
};

export const createInMemRedisApp = async (port) => {
  await pidFromPort(port)
    .then(async () => port)
    .then(killPortProcess)
    .catch((error) => {
      console.log(error);
    });

  const redisServer = new RedisMemoryServer({
    instance: {
      port,
    },
    autoStart: true,
  });

  const host = await redisServer.getHost();
  const url = `redis://${host}:${port}`;
  return { redisServer, url };
};
