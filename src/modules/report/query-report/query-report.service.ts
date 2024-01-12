import { CACHE_KEYS } from '@/constants/caches';
import { CacheService } from '@/utils/modules/cache/cache.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryReportService {
  constructor(private cacheService: CacheService) {}

  public async getMyRecentlyQuery(userId: string) {
    const result = await this.cacheService.zReverangeByScore(userId, 0, 2);
    return result.filter((item, index) => index % 2 === 0);
  }

  public async getAllRecentlyQuery(userId: string) {
    const myRecentlyQuery = await this.getMyRecentlyQuery(userId);
    const result = [];

    let index = 0;
    let cachedData = null;
    while (result.length < 3 && (!cachedData || cachedData.length > 0)) {
      cachedData = await this.cacheService.zReverangeByScore(
        CACHE_KEYS.TOP_SEARCH,
        index,
        index,
      );

      if (!myRecentlyQuery.includes(cachedData[0])) {
        result.push(cachedData[0]);
      }

      index++;
    }

    return result;
  }
}
