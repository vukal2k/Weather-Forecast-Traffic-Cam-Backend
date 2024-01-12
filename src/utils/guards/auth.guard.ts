import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class ClientAuthGuard implements CanActivate {
  public constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.getArgByIndex(0);

      const allowUnauthorize = this.reflector.get<string[]>(
        'allowUnauthorizedRequest',
        context.getHandler(),
      );
      if (!!allowUnauthorize) {
        return true;
      }

      const apiKey = request.headers['api-key'];
      request.userId = apiKey;

      if (!apiKey) {
        throw new UnauthorizedException();
      }

      return true;
    } catch (e) {
      return false;
    }
  }
}
