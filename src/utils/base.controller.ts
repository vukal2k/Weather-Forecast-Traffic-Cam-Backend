import { ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'Api-Key',
  description: 'Get from API /api-key',
})
export class BaseController {}
