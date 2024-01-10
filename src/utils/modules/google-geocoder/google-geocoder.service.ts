import { Injectable } from '@nestjs/common';
import * as GoogleGeocoder from 'google-geocoder';

@Injectable()
export class GoogleGeocoderService {
  private _geo;
  /**
   *
   */
  constructor() {
    this._geo = GoogleGeocoder({
      key: process.env.GOOGLE_GEOCODER_API_KEY, // Replace with your API key
    });
  }

  public reverseFind(lat: number, lng: number) {
    return new Promise((resolve, reject) => {
      this._geo.reverseFind(lat, lng, function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }
}
