import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GoogleGeocoderModule } from '../../utils/modules/google-geocoder/google-geocoder.module';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
    }),
    GoogleGeocoderModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class TrafficImageModule {}
