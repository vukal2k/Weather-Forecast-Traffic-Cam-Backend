import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../typeorm-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './utils/filters/exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
