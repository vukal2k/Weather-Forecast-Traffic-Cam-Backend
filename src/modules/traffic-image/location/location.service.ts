import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  /**
   *
   */
  constructor(private httpService: HttpService) {}

  public getLocations() {
    return this.httpService.get(process.env.TRAFFIC_IMAGES_URL);
  }
}
