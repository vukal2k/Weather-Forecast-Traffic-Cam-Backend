import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GoogleGeocoderService } from '../../../utils/modules/google-geocoder/google-geocoder.service';

@Injectable()
export class LocationService {
  /**
   *
   */
  constructor(
    private httpService: HttpService,
    private googleGeocorderService: GoogleGeocoderService,
  ) {}

  public async getLocations(dateTime: Date) {
    const result = await firstValueFrom(
      this.httpService.get(process.env.TRAFFIC_IMAGES_URL, {
        params: {
          date_time: dateTime,
        },
      }),
    );

    const locations = [];

    for await (const camera of result.data.items[0]?.cameras ?? []) {
      // const lat = camera.location.latitude;
      // const long = camera.location.longitude;

      // const geo = await this.googleGeocorderService.reverseFind(lat, long);
      locations.push({
        // location: geo[0]?.formatted_address ?? '',
        location: camera.image,
        image: camera.image,
      });
    }

    return locations;
  }
}
