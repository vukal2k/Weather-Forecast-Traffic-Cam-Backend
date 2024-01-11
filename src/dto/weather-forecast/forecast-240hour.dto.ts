import { ApiProperty } from '@nestjs/swagger';

export class Weather24ForecastPeriodItem {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  dateTime: Date;

  @ApiProperty()
  westForecast: string;

  @ApiProperty()
  eastForecast: string;

  @ApiProperty()
  centraForecast: string;

  @ApiProperty()
  southForecast: string;

  @ApiProperty()
  northForecast: string;
}

export class Weather24Forecast {
  @ApiProperty({
    example: 'Cloudy',
  })
  forecast: string;
  @ApiProperty()
  lowTemperature: number;

  @ApiProperty()
  hightTemperature: number;

  @ApiProperty({
    isArray: true,
    type: Weather24ForecastPeriodItem,
  })
  periods: Weather24ForecastPeriodItem[];
}
