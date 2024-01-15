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
    this.cacheService.zAdd(CACHE_KEYS.TOP_SEARCH, moment(dateTime).toISOString(), new Date().getTime());
    this.cacheService.zAdd(currentUserId, moment(dateTime).toISOString(), new Date().getTime());
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

  public async get2ForeCast(
    lat: number,
    long: number,
    currentUserId: string,
    dateTime?: Date | string,
  ): Promise<string> {
    if (dateTime) {
      this.cacheUserQuery(dateTime, currentUserId);
    }

    const dateTimeSg = moment(dateTime).tz('Asia/Singapore');

    const rawData = await firstValueFrom(
      this.httpService.get(this.configService.get('FORECAST_2_HOUR_URL'), {
        params: {
          date_time: dateTime ? dateTimeSg.format('YYYY-MM-DDTHH:mm:ss+08:00') : undefined,
        },
      }),
    );

    const locations = rawData.data?.area_metadata.sort((a, b) => {
      const previousDistance = (Math.abs(a.label_location.longitude - long) ** 2) + Math.abs(a.label_location.latitude - lat) ** 2;
      const nextDistance = (Math.abs(b.label_location.longitude - long) ** 2) + Math.abs(b.label_location.latitude - lat) ** 2;

      return previousDistance < nextDistance ? -1 : 1;

    }) ?? []

    const areaForecast = rawData.data?.items[0]?.forecasts.find(fc => locations[0]?.name && fc.area === locations[0]?.name);
    return areaForecast?.forecast;
  }
}
