import { Module } from '@nestjs/common';
import { GoogleGeocoderService } from './google-geocoder.service';

@Module({
  providers: [GoogleGeocoderService],
  exports: [GoogleGeocoderService],
})
export class GoogleGeocoderModule {}
