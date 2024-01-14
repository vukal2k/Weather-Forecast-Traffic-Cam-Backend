import { BaseController } from '@/utils/base.controller';
import { CurrentUser } from '@/utils/decorators/user.decorator';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Recommend to the user his/her most recent searches',
  })
  public async getMyRecent(@CurrentUser() userId) {
    return this.queryReportSv.getMyRecentlyQuery(userId);
  }

  @Get('all-recently')
  @ApiOperation({
    summary: 'Recommend to the most recent searches of other people',
  })
  public async getAllRecently(@CurrentUser() userId) {
    return this.queryReportSv.getAllRecentlyQuery(userId);
  }

  @Post('log-history')
  @ApiOperation({
    summary: 'Log location search history to db',
  })
  logLocationSearch(
    @Body() logLocationSearch: LogLocationSearchDto,
    @CurrentUser() userId: string,
  ): Promise<void> {
    return this.queryReportSv.logLocationSearch(logLocationSearch, userId);
  }

  @AllowUnauthorizedRequest()
  @Get('top-10-recently-queries')
  @ApiOperation({
    summary:
      'Retrieve the most recent 10 date time + location searched by allusers consolidated.',
  })
  @ApiResponse({
    type: TopRecentlyQueriesResponseItem,
    isArray: true,
  })
  getTop10RecentlyQueries(): Promise<TopRecentlyQueriesResponseItem[]> {
    return this.queryReportSv.getTop10RecentlyQueries();
  }

  @AllowUnauthorizedRequest()
  @Get('top-10-most-queries/period')
  @ApiOperation({
    summary:
      'Retrieve the top 10 date time + location searched within a period.',
  })
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
  @ApiOperation({
    summary: 'Retrieve the period of which there are most searches performed.',
  })
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
