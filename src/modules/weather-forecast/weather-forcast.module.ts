import { HttpModule } from '@nestjs/axios';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '../../utils/modules/cache/cache.module';
import { Forecast24HoursController } from './forecast24-hours/forecast24-hours.controller';
import { Forecast24HoursService } from './forecast24-hours/forecast24-hours.service';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from '@/utils/filters/exception.filter';
import { ClientAuthGuard } from '@/utils/guards/auth.guard';

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
