import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  /**
   *
   */
  constructor(private locationSv: LocationService) {}
  @Get()
  getLocations() {
    return this.locationSv.getLocations();
  }
}
