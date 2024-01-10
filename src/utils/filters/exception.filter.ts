import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';
@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor() {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const contextHttp = host.switchToHttp();
    const response = contextHttp.getResponse<Response>() as any;
    const request = ctx.getRequest<Request>();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const stack = exception.stack.split('\n').reduce(function (
      obj,
      str,
      index,
    ) {
      if (str) {
        obj['stack' + index] = str;
      }
      return obj;
    }, {});
    const errorDetail: any = {
      url: request.method + ' ' + request.url + ' (' + statusCode + ')',
      body: request.body,
      headers: {
        owner: request?.headers?.owner,
        apiversion: request?.headers?.apiversion,
        token: request?.headers?.token,
        'user-agent': request?.headers['user-agent'],
        'content-type': request?.headers['content-type'],
      },
      message: response?.message,
      stack,
    };

    // const message = 'Internal server error';
    //TODO: Add logging

    if (process.env.LOG_LEVEL === 'DEBUG') {
      response.status(HttpStatus.OK).json({
        statusCode,
        message: exception.message,
        errors: errorDetail,
      });
    } else {
      response.status(statusCode).json({
        statusCode,
        // message, // todo Pls use this in PROD
        message: exception.message, // This is for debugging only
      });
    }
  }
}
