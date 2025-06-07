import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './common/config/swagger.config';
import { LoggerService } from './modules/logger/logger.service';
import { LoggerSentryTransport } from './modules/logger/transports/logger-sentry.transport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const customLoggerService = app.get(LoggerService);
  const loggerSentryTransport = app.get(LoggerSentryTransport);

  app.useGlobalPipes(new ValidationPipe());

  customLoggerService.addTransport(loggerSentryTransport);
  // customLoggerService.setContext('bootstrap');

  swaggerConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
