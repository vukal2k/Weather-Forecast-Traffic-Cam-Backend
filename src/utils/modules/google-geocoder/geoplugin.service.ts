import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeopluginService {
  /**
   *
   */
  constructor(private httpService: HttpService) {}

  public async reverseFind(lat: number, lng: number) {
    const response = await firstValueFrom(
      this.httpService.get(
        `http://geoplugin.net/extras/location.gp?lat=${lat}&long=${lng}&format=json`,
      ),
    );

    return response.data;
  }
}
