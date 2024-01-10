import { ApiProperty } from '@nestjs/swagger';

class LongLatDto {
  latitude: number;
  longitude: number;
}
export class LocationDto {
  @ApiProperty({
    example: '20 st Newyork US',
    description: 'Readble address',
  })
  location: string;

  @ApiProperty({
    example: 'http://image.com/example.jpeg',
    description: 'Camera image url',
  })
  image: string;

  locationLongLat: LongLatDto;
}
