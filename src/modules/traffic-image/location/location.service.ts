/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { LocationDto } from '../../../dto/traffic-image/location.dto';
import { CacheService } from '../../../utils/modules/cache/cache.service';
import { GoogleGeocoderService } from '../../../utils/modules/google-geocoder/google-geocoder.service';

@Injectable()
export class LocationService {
  /**
   *
   */
  constructor(
    private httpService: HttpService,
    private googleGeocorderService: GoogleGeocoderService,
    private cacheService: CacheService,
  ) {}

  public async getLocations(dateTime?: Date | string): Promise<LocationDto[]> {
    const cachedData: LocationDto[] = await this.cacheService.get(
      dateTime ? moment(dateTime).toISOString() : 'all',
    );
    if (cachedData) {
      return cachedData;
    }

    const dateTimeSg = moment(dateTime)
      .tz('Asia/Singapore')
      .format('YYYY-MM-DDTHH:mm:ss+08:00');

    console.log('dateTimeSg: ', dateTimeSg);

    const result = await firstValueFrom(
      this.httpService.get(process.env.TRAFFIC_IMAGES_URL, {
        params: {
          date_time: dateTimeSg,
        },
      }),
    );

    const locations: LocationDto[] = [];

    for await (const camera of result.data.items[0]?.cameras ?? []) {
      const lat = camera.location.latitude;
      const long = camera.location.longitude;

      const geo = await this.googleGeocorderService
        .reverseFind(lat, long)
        .catch((err) => {
          console.error(err);
        });
      locations.push({
        location:
          geo && !!geo[0]?.formatted_address
            ? geo[0]?.formatted_address
            : camera.location.latitude + '-' + camera.location.longitude,
        image: camera.image,
        locationLongLat: camera.location,
      });
    }

    await this.cacheService.set(
      dateTime ? moment(dateTime).toISOString() : 'all',
      locations,
    );

    return locations;
  }
}
