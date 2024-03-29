import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { AllowUnauthorizedRequest } from './utils/decorators/allow.unauthorized.decorator';
import { ILoggerService } from './utils/modules/logger/adapter';

@Controller()
export class AppController {
  constructor(private readonly loggerService: ILoggerService) {}

  @AllowUnauthorizedRequest()
  @Post('api-key')
  @ApiOperation({
    summary: 'Mock authentication',
  })
  getAPIKey(): string {
    this.loggerService.error(uuidv4());
    this.loggerService.info(uuidv4());
    return uuidv4();
  }
}
