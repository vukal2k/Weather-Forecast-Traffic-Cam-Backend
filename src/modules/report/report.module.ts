import { Module } from '@nestjs/common';
import { QueryReportController } from './query-report/query-report.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@/utils/modules/cache/cache.module';
import { QueryReportService } from './query-report/query-report.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    CacheModule,
  ],
  controllers: [QueryReportController],
  providers: [QueryReportService],
})
export class ReportModule {}
