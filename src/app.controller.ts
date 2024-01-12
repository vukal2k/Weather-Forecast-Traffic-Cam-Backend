import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('api-key')
  getAPIKey(): string {
    return uuidv4();
  }
}
