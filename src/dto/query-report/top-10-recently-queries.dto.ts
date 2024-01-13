import { ApiProperty } from '@nestjs/swagger';

export class LogLocationSearchDto {
  @ApiProperty({
    required: true,
  })
  dateTime: Date;

  @ApiProperty({
    required: true,
  })
  location: string;
}

export class Top10RecentlyQueriesResponseItem extends LogLocationSearchDto {
  created: Date | string;
  createdBy: string;
}
