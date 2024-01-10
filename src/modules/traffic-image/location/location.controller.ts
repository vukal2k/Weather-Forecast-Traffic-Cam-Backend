import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  /**
   *
   */
  constructor(private locationSv: LocationService) {}
  @Get()
  getLocations(@Query('dateTime') dateTime: Date) {
    return this.locationSv.getLocations(dateTime);
  }
}
