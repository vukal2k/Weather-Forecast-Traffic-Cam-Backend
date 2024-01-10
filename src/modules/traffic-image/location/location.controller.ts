import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationDto } from '../../../dto/traffic-image/location.dto';
import { LocationService } from './location.service';

@ApiTags('Traffic Images')
@Controller('locations')
export class LocationController {
  /**
   *
   */
  constructor(private locationSv: LocationService) {}
  @Get()
  @ApiResponse({ type: LocationDto, isArray: true })
  @ApiQuery({
    type: Date,
    name: 'dateTime',
    description: 'YYYY-MM-DD[T]HH:mm:ss (SGT)',
    required: false,
  })
  getLocations(@Query('dateTime') dateTime?: Date): Promise<LocationDto[]> {
    console.log(dateTime);
    return this.locationSv.getLocations(dateTime);
  }
}
