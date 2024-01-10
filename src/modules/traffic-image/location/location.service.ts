import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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

  public async getLocations(dateTime: Date): Promise<LocationDto[]> {
    const cachedData: LocationDto[] = await this.cacheService.get(
      dateTime?.toISOString() ?? 'all',
    );
    if (cachedData) {
      return cachedData;
    }

    const result = await firstValueFrom(
      this.httpService.get(process.env.TRAFFIC_IMAGES_URL, {
        params: {
          date_time: dateTime,
        },
      }),
    );

    const locations: LocationDto[] = [];

    for await (const camera of result.data.items[0]?.cameras ?? []) {
      const lat = camera.location.latitude;
      const long = camera.location.longitude;

      const geo = await this.googleGeocorderService.reverseFind(lat, long);
      locations.push({
        location: geo[0]?.formatted_address ?? '',
        image: camera.image,
      });
    }

    await this.cacheService.set(dateTime?.toDateString() ?? 'all', locations);

    return locations;
  }
}
