import { BaseController } from '@/utils/base.controller';
import { CurrentUser } from '@/utils/decorators/user.decorator';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  PeriodType,
  TopMostPeriodResponseItem,
} from '../../../dto/query-report/top-most-period.dto';
import { TopMostQueriesResponseItem } from '../../../dto/query-report/top-most-queries.dto';
import {
  LogLocationSearchDto,
  TopRecentlyQueriesResponseItem,
} from '../../../dto/query-report/top-recently-queries.dto';
import { AllowUnauthorizedRequest } from '../../../utils/decorators/allow.unauthorized.decorator';
import { QueryReportService } from './query-report.service';

@ApiTags('Query Report')
@Controller('query-report')
export class QueryReportController extends BaseController {
  /**
   *
   */
  constructor(private queryReportSv: QueryReportService) {
    super();
  }

  @Get('my-recently')
  public async getMyRecent(@CurrentUser() userId) {
    return this.queryReportSv.getMyRecentlyQuery(userId);
  }

  @Get('all-recently')
  public async getAllRecently(@CurrentUser() userId) {
    return this.queryReportSv.getAllRecentlyQuery(userId);
  }

  @Post('log-history')
  logLocationSearch(
    @Body() logLocationSearch: LogLocationSearchDto,
    @CurrentUser() userId: string,
  ): Promise<void> {
    return this.queryReportSv.logLocationSearch(logLocationSearch, userId);
  }

  @AllowUnauthorizedRequest()
  @Get('top-10-recently-queries')
  @ApiResponse({
    type: TopRecentlyQueriesResponseItem,
    isArray: true,
  })
  getTop10RecentlyQueries(): Promise<TopRecentlyQueriesResponseItem[]> {
    return this.queryReportSv.getTop10RecentlyQueries();
  }

  @AllowUnauthorizedRequest()
  @Get('top-10-most-queries/period')
  @ApiResponse({
    type: TopMostQueriesResponseItem,
    isArray: true,
  })
  getTop10MostQueriesWithPeriod(
    @Query('from') from: Date,
    @Query('to') to: Date,
  ): Promise<TopMostQueriesResponseItem[]> {
    return this.queryReportSv.getTop10MostQueriesWithPeriod(from, to);
  }

  @AllowUnauthorizedRequest()
  @Get('most-period-queries')
  @ApiResponse({
    type: TopMostPeriodResponseItem,
  })
  getMostSearchPeriod(
    @Query('periodAmount') periodAmount: number,
    @Query('period') period: PeriodType,
  ): Promise<TopMostPeriodResponseItem> {
    return this.queryReportSv.getMostSearchPeriod(periodAmount, period);
  }
}
