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

  public async getAllRecentlyQuery() {
    const result = await this.cacheService.zReverangeByScore(
      CACHE_KEYS.TOP_SEARCH,
      0,
      2,
    );
    return result.filter((item, index) => index % 2 === 0);
  }
}
