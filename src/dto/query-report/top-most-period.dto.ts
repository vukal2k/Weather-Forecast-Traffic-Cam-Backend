import { OmitType } from '@nestjs/swagger';
import { LogLocationSearchDto } from './top-recently-queries.dto';

export enum PeriodType {
  MINUTE = 'minute',
  HOURS = 'hour',
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export class TopMostPeriodResponseItem extends OmitType(LogLocationSearchDto, [
  'location',
] as const) {
  count: number;
}
