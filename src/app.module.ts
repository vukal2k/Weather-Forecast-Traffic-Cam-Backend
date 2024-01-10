import { HttpModule } from '@nestjs/axios';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../typeorm-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrafficImageModule } from './modules/traffic-image/traffic-image.module';
import { AllExceptionsFilter } from './utils/filters/exception.filter';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
    }),
    TypeOrmModule.forRoot({
      ...config,
    }),
    TrafficImageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
