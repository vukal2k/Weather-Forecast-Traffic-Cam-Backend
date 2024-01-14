import { HttpModule } from '@nestjs/axios';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../typeorm-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './modules/report/report.module';
import { TrafficImageModule } from './modules/traffic-image/traffic-image.module';
import { WeatherForecastModule } from './modules/weather-forecast/weather-forcast.module';
import { AllExceptionsFilter } from './utils/filters/exception.filter';
import { ClientAuthGuard } from './utils/guards/auth.guard';
import { LoggerCommonModule } from './utils/modules/logger/module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
    }),
    TypeOrmModule.forRoot({
      ...config,
    }),
    LoggerCommonModule,
    TrafficImageModule,
    WeatherForecastModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ClientAuthGuard,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_GUARD, useExisting: ClientAuthGuard },
  ],
})
export class AppModule {}
