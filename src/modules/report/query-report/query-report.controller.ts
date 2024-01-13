import { BaseController } from '@/utils/base.controller';
import { CurrentUser } from '@/utils/decorators/user.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  LogLocationSearchDto,
  Top10RecentlyQueriesResponseItem,
} from '../../../dto/query-report/top-10-recently-queries.dto';
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
    type: Top10RecentlyQueriesResponseItem,
    isArray: true,
  })
  getTop10RecentlyQueries(): Promise<Top10RecentlyQueriesResponseItem[]> {
    return this.queryReportSv.getTop10RecentlyQueries();
  }
}
