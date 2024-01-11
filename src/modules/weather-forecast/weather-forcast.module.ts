import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '../../utils/modules/cache/cache.module';
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
  ],
  controllers: [Forecast24HoursController],
  providers: [Forecast24HoursService],
})
export class WeatherForecastModule {}
