import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MockUtils } from '../../utils/tests/in-memory-datasource';

import { ILoggerService } from './adapter';
import { LoggerService } from './service';

describe('LoggerService', () => {
  let loggerService: ILoggerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: ILoggerService,
          useValue: new LoggerService(),
        },
      ],
    }).compile();

    loggerService = module.get(ILoggerService);
    loggerService.setExtraInfo({ service: 'Test' });

    loggerService.pinoHttp = MockUtils.setMock({
      logger: {
        error: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
        trace: jest.fn(),
        fatal: jest.fn(),
        bindings: () => true,
      },
    });
  });

  describe('error', () => {
    test('should log HttpException error', () => {
      const error = new HttpException(
        'Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

      loggerService.error('ERROR', error);

      expect(loggerService.pinoHttp.logger.error).toHaveBeenCalled();
    });

    test('should log error with string Exception', () => {
      loggerService.error('ERROR');

      expect(loggerService.pinoHttp.logger.error).toHaveBeenCalled();
    });

    test('should log error with getResponse string and getStatus function', () => {
      loggerService.error('ERROR', {
        getResponse: () => 'ERROR',
        getStatus: () => 200,
      });

      expect(loggerService.pinoHttp.logger.error).toHaveBeenCalled();
    });

    test('should log error with getResponse string and status property', () => {
      loggerService.error('ERROR', {
        getResponse: () => 'ERROR',
        getStatus: () => jest.fn(),
        status: 200,
      });

      expect(loggerService.pinoHttp.logger.error).toHaveBeenCalled();
    });

    test('should log default node error', () => {
      loggerService.error('ERROR', new Error('ERROR'));

      expect(loggerService.pinoHttp.logger.error).toHaveBeenCalled();
    });

    test('should log error with  getResponse function', () => {
      loggerService.error('ERROR', new InternalServerErrorException());

      expect(loggerService.pinoHttp.logger.error).toHaveBeenCalled();
    });
  });

  describe('fatal', () => {
    test('should log fatal error', () => {
      loggerService.fatal('ERROR', new InternalServerErrorException());
      expect(loggerService.pinoHttp.logger.fatal).toHaveBeenCalled();
    });

    test('should log fatal error with global context', () => {
      loggerService.fatal('ERROR', new InternalServerErrorException());
      expect(loggerService.pinoHttp.logger.fatal).toHaveBeenCalled();
    });
  });

  describe('warn', () => {
    test('should warn without obj', () => {
      loggerService.warn('message', { message: 'message', context: 'context' });

      expect(loggerService.pinoHttp.logger.warn).toHaveBeenCalled();
    });

    test('should warn without obj and context', () => {
      loggerService.warn('message', { message: 'message' });

      expect(loggerService.pinoHttp.logger.warn).toHaveBeenCalled();
    });

    test('should warn with all options', () => {
      loggerService.warn('message', {
        message: 'message',
        context: 'context',
        obj: {},
      });

      expect(loggerService.pinoHttp.logger.warn).toHaveBeenCalled();
    });
  });

  describe('info', () => {
    test('should info without obj', () => {
      loggerService.info('message', { message: 'message', context: 'context' });

      expect(loggerService.pinoHttp.logger.info).toHaveBeenCalled();
    });

    test('should info without obj and context', () => {
      loggerService.info('message', { message: 'message' });

      expect(loggerService.pinoHttp.logger.info).toHaveBeenCalled();
    });

    test('should info with all options', () => {
      loggerService.info('message', {
        message: 'message',
        context: 'context',
        obj: {},
      });

      expect(loggerService.pinoHttp.logger.info).toHaveBeenCalled();
    });
  });

  describe('trace', () => {
    test('should trace without obj', () => {
      loggerService.trace('message', {
        message: 'message',
        context: 'context',
      });

      expect(loggerService.pinoHttp.logger.trace).toHaveBeenCalled();
    });

    test('should trace without obj and context', () => {
      loggerService.trace('message', { message: 'message' });

      expect(loggerService.pinoHttp.logger.trace).toHaveBeenCalled();
    });

    test('should trace with all options', () => {
      loggerService.trace('message', {
        message: 'message',
        context: 'context',
        obj: {},
      });

      expect(loggerService.pinoHttp.logger.trace).toHaveBeenCalled();
    });
  });
});
