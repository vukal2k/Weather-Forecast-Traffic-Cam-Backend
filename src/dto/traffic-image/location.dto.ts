import { ApiProperty } from '@nestjs/swagger';

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
}
