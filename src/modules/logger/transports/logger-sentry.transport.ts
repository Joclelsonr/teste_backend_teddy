import { Inject, Injectable, LogLevel } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { LoggerTransportInterface } from '../interfaces/logger-transport.interface';
import { loggerSentryConfig } from '../../../common/config/logger-sentry.config';

@Injectable()
export class LoggerSentryTransport implements LoggerTransportInterface {
  constructor(
    @Inject(loggerSentryConfig.KEY)
    private config: ConfigType<typeof loggerSentryConfig>,
  ) {
    Sentry.init({
      dsn: this.config.dsn,
    });
  }

  log(message: string, logLevel: LogLevel, error?: Error | string): void {
    const serverity = this.config.logLevelMap(logLevel);

    if (error) {
      Sentry.captureException(error, {
        level: serverity,
        extra: { developerMessage: message },
      });
    } else {
      Sentry.captureMessage(message, serverity);
    }
  }
}
