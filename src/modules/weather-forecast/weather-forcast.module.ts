import { AllExceptionsFilter } from '@/utils/filters/exception.filter';
import { ClientAuthGuard } from '@/utils/guards/auth.guard';
import { HttpModule } from '@nestjs/axios';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CacheModule } from '../../utils/modules/cache/cache.module';
import { LoggerCommonModule } from '../../utils/modules/logger/module';
import { Forecast24HoursController } from './forecast24-hours/forecast24-hours.controller';
import { Forecast24HoursService } from './forecast24-hours/forecast24-hours.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    CacheModule,
    LoggerCommonModule,
  ],
  controllers: [Forecast24HoursController],
  providers: [
    ClientAuthGuard,
    Forecast24HoursService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_GUARD, useExisting: ClientAuthGuard },
  ],
})
export class WeatherForecastModule {}
