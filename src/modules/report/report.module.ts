import { CacheModule } from '@/utils/modules/cache/cache.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationSearchHistoryEntity } from '../../databases/entities/LocationSearchHistory.entity';
import { LocationSearchHistoryRepository } from '../../databases/repositories/LocationSearchHistory.repository';
import { QueryReportController } from './query-report/query-report.controller';
import { QueryReportService } from './query-report/query-report.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([LocationSearchHistoryEntity]),
    CacheModule,
  ],
  controllers: [QueryReportController],
  providers: [QueryReportService, LocationSearchHistoryRepository],
})
export class ReportModule {}
