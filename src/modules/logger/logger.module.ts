import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './logger.service';
import { LoggerTransportService } from './logger-transport.service';
import { LoggerSentryTransport } from './transports/logger-sentry.transport';
import { loggerSentryConfig } from '../../common/config/logger-sentry.config';
import { loggerConfig } from '../../common/config/logger.config';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(loggerConfig),
    ConfigModule.forFeature(loggerSentryConfig),
  ],
  providers: [LoggerService, LoggerTransportService, LoggerSentryTransport],
  exports: [LoggerService],
})
export class LoggerModule {}
