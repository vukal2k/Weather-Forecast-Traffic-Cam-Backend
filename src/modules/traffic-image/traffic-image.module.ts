import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleGeocoderModule } from '../../utils/modules/google-geocoder/google-geocoder.module';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    GoogleGeocoderModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class TrafficImageModule {}