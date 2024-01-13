/* eslint-disable prettier/prettier */
import { CACHE_KEYS } from '@/constants/caches';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from "moment-timezone";
import { firstValueFrom } from 'rxjs';
import {
  Weather24Forecast,
  Weather24ForecastPeriodItem,
} from '../../../dto/weather-forecast/forecast-240hour.dto';
import { CacheService } from '../../../utils/modules/cache/cache.service';


@Injectable()
export class Forecast24HoursService {
  /**
   *
   */
  constructor(
    private httpService: HttpService,
    private cacheService: CacheService,
    private configService: ConfigService,
  ) {}

  private async cacheUserQuery(dateTime: Date | string, currentUserId: string) {
    this.cacheService.zCounter(CACHE_KEYS.TOP_SEARCH, moment(dateTime).toISOString());
    this.cacheService.zCounter(currentUserId, moment(dateTime).toISOString());
  }

  public async get24ForeCast(
    currentUserId: string,
    dateTime?: Date | string,
    date?: Date | string,
  ): Promise<Weather24Forecast> {
    if (dateTime) {
      this.cacheUserQuery(dateTime, currentUserId);
    }

    const dateTimeSg = moment(dateTime).tz('Asia/Singapore');

    const rawData = await firstValueFrom(
      this.httpService.get(this.configService.get('FORECAST_24_HOUR_URL'), {
        params: {
          date_time: dateTime ? dateTimeSg.format('YYYY-MM-DDTHH:mm:ss+08:00') : undefined,
          date: date ? (!dateTime ? date : dateTimeSg.format('YYYY-MM-DD')) : undefined,
        },
      }),
    );

    const result = new Weather24Forecast();
    result.forecast = rawData.data?.items[0]?.general?.forecast;
    result.hightTemperature = rawData.data?.items[0]?.general?.temperature.high;
    result.lowTemperature = rawData.data?.items[0]?.general?.temperature.low;
    result.periods = rawData.data?.items[0]?.periods
      ?.sort((periodA, periodB) =>
        new Date(periodA.time.start).getTime() >
          new Date(periodB.time.start).getTime()
          ? 1
          : -1,
      )
      .map(
        (period: any) =>
          ({
            dateTime: period.time.start,
            westForecast: period.regions.west,
            eastForecast: period.regions.east,
            centraForecast: period.regions.central,
            northForecast: period.regions.north,
            southForecast: period.regions.south,
          }) as Weather24ForecastPeriodItem,
      );

    return result;
  }
}
