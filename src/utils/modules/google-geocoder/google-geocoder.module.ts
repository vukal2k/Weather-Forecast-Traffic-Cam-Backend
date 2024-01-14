import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GeopluginService } from './geoplugin.service';
import { GoogleGeocoderService } from './google-geocoder.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
    }),
  ],
  providers: [GoogleGeocoderService, GeopluginService],
  exports: [GoogleGeocoderService, GeopluginService],
})
export class GoogleGeocoderModule {}
