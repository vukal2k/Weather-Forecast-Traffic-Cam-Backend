import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './utils/interceptors/response.interceptor';
import { ILoggerService } from './utils/modules/logger/adapter';
import { LoggerService } from './utils/modules/logger/service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const moduleRef = app.select(AppModule);
  const reflector = moduleRef.get(Reflector);

  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  const config = new DocumentBuilder()
    .setTitle('Weather Forecast & Traffic Camera')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  app.useLogger(app.get(ILoggerService));
  const logger = new LoggerService();

  await app.listen(3000);
  logger.info(`🚀🚀🚀 App service running on port 3000`);
}
bootstrap();
