import { BaseController } from '@/utils/base.controller';
import { CurrentUser } from '@/utils/decorators/user.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogLocationSearchDto } from '../../../dto/traffic-image/location.dto';
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
}
