import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';

@Injectable()
export class CacheService {
  redis: Redis.Redis;
  constructor(private configService: ConfigService) {
    this.redis = new Redis.Redis(this.configService.get('REDIS_URL'));
  }

  async get<T>(key: string): Promise<T> {
    const data = await this.redis.get(key);
    const newData: T = JSON.parse(data);
    return newData;
  }

  async set<T>(key: string, data: T, ttlInSecond?: number): Promise<'OK'> {
    const str = JSON.stringify(data);
    if (ttlInSecond) {
      return await this.redis.setex(key, ttlInSecond, str);
    }
    return await this.redis.set(key, str);
  }

  async zCounter<T>(key: string, data: T): Promise<number> {
    const str = JSON.stringify(data);
    return await this.redis.zadd(key, 'INCR', 1, str);
  }

  async zReverangeByScore<T>(
    key: string,
    start: number,
    stop: number,
  ): Promise<T[]> {
    const data = await this.redis.zrevrange(key, start, stop, 'WITHSCORES');
    const newData: T[] = data.map((d: string) => JSON.parse(d));
    return newData;
  }

  async zRemrangeByScore(
    key: string,
    start: number | string,
    stop: number | string,
  ): Promise<number> {
    return await this.redis.zremrangebyscore(key, start, stop);
  }
}
