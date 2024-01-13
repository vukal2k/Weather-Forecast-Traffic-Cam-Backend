import { CACHE_KEYS } from '@/constants/caches';
import { CacheService } from '@/utils/modules/cache/cache.service';
import { Injectable } from '@nestjs/common';
import { LocationSearchHistoryRepository } from '../../../databases/repositories/LocationSearchHistory.repository';
import { TopMostQueriesResponseItem } from '../../../dto/query-report/top-most-queries.dto';
import {
  LogLocationSearchDto,
  TopRecentlyQueriesResponseItem,
} from '../../../dto/query-report/top-recently-queries.dto';

@Injectable()
export class QueryReportService {
  constructor(
    private cacheService: CacheService,
    private locationSearchHistoryRepository: LocationSearchHistoryRepository,
  ) {}

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

      if (cachedData[0] && !myRecentlyQuery.includes(cachedData[0])) {
        result.push(cachedData[0]);
      }

      index++;
    }

    return result;
  }

  public async logLocationSearch(
    logLocationSearch: LogLocationSearchDto,
    userId: string,
  ) {
    await this.locationSearchHistoryRepository.insert({
      createdBy: userId,
      ...logLocationSearch,
    });
  }

  public async getTop10RecentlyQueries() {
    const resultData = await this.locationSearchHistoryRepository.find({
      order: {
        created: 'DESC',
      },
      take: 10,
    });

    return resultData.map(
      (rDt) =>
        ({
          created: rDt.created,
          createdBy: rDt.createdBy,
          location: rDt.location,
          dateTime: rDt.dateTime,
        }) as TopRecentlyQueriesResponseItem,
    );
  }

  public async getTop10MostQueriesWithPeriod(
    from: Date | string,
    to: Date | string,
  ) {
    const resultData = await this.locationSearchHistoryRepository
      .createQueryBuilder('search_query')
      .select('search_query.date_time', 'dateTime')
      .addSelect('search_query.location', 'location')
      .addSelect('COUNT(id)', 'count')
      .where('search_query.created BETWEEN :startDate AND :endDate', {
        startDate: new Date(from).toISOString(),
        endDate: new Date(to).toISOString(),
      })
      .groupBy('search_query.date_time')
      .addGroupBy('search_query.location')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    return resultData.map(
      (rDt) =>
        ({
          location: rDt.location,
          dateTime: rDt.dateTime,
          count: rDt.count,
        }) as TopMostQueriesResponseItem,
    );
  }
}
