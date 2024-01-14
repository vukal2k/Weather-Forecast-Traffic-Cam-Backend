import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationDto } from '../../../dto/traffic-image/location.dto';
import { BaseController } from '../../../utils/base.controller';
import { LocationService } from './location.service';

@ApiTags('Traffic Images')
@Controller('locations')
export class LocationController extends BaseController {
  /**
   *
   */
  constructor(private locationSv: LocationService) {
    super();
  }
  @Get()
  @ApiResponse({ type: LocationDto, isArray: true })
  @ApiQuery({
    type: Date,
    name: 'dateTime',
    description: 'Date with ISO String',
    required: false,
  })
  getLocations(@Query('dateTime') dateTime?: Date): Promise<LocationDto[]> {
    return this.locationSv.getLocations(dateTime);
  }
}
