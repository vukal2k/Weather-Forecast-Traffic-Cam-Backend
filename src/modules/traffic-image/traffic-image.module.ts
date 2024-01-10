import { Module } from '@nestjs/common';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
})
export class TrafficImageModule {}
