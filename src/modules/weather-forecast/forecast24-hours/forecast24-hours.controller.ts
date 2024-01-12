import { Controller, Get, Query } from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Weather24Forecast } from '../../../dto/weather-forecast/forecast-240hour.dto';
import { Forecast24HoursService } from './forecast24-hours.service';
import { CurrentUser } from '@/utils/decorators/user.decorator';

@ApiHeader({
  name: 'Api-Key',
  description: 'Get from API /api-key',
})
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
    @CurrentUser() userId: string,
    @Query('dateTime') dateTime?: Date,
    @Query('date') date?: Date,
  ): Promise<Weather24Forecast> {
    return this.foreCast24HourService.get24ForeCast(userId, dateTime, date);
  }
}
