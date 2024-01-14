import { Module } from '@nestjs/common';
import { ILoggerService } from './adapter';
import { LoggerService } from './service';
@Module({
  providers: [
    {
      provide: ILoggerService,
      useFactory: () => {
        return new LoggerService();
      },
    },
  ],
  exports: [ILoggerService],
})
export class LoggerCommonModule {}
