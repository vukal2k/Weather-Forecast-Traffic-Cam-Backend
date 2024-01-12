import { Controller, Get } from '@nestjs/common';
import { QueryReportService } from './query-report.service';
import { CurrentUser } from '@/utils/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '@/utils/base.controller';

@ApiTags('Query Report')
@Controller('query-report')
export class QueryReportController extends BaseController {
  /**
   *
   */
  constructor(private queryReportSv: QueryReportService) {
    super();
  }

  @Get('/my-recently')
  public async getMyRecent(@CurrentUser() userId) {
    return this.queryReportSv.getMyRecentlyQuery(userId);
  }

  @Get('/all-recently')
  public async getAllRecently(@CurrentUser() userId) {
    return this.queryReportSv.getAllRecentlyQuery(userId);
  }
}
