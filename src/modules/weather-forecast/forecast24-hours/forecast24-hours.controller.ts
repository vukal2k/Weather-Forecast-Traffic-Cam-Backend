import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Weather24Forecast } from '../../../dto/weather-forecast/forecast-240hour.dto';
import { Forecast24HoursService } from './forecast24-hours.service';

@ApiTags('Weather Forecast')
@Controller('forecast24-hours')
export class Forecast24HoursController {
  /**
   *
   */
  constructor(private foreCast24HourService: Forecast24HoursService) {}
  @Get()
  @ApiQuery({
    type: Date,
    name: 'dateTime',
    description: 'YYYY-MM-DD[T]HH:mm:ss (SGT)',
    required: false,
  })
  @ApiQuery({
    type: Date,
    name: 'date',
    description: 'YYYY-MM-DD',
    required: false,
  })
  @ApiResponse({ type: Weather24Forecast, isArray: true })
  get24ForeCast(
    @Query('dateTime') dateTime?: Date,
    @Query('date') date?: Date,
  ): Promise<Weather24Forecast> {
    return this.foreCast24HourService.get24ForeCast(dateTime, date);
  }
}
