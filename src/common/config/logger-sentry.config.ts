import { registerAs } from '@nestjs/config';
import { LogLevel } from '@nestjs/common';
import { SeverityLevel } from '@sentry/node';
import { LOGGER_SENTRY_MODULE_CONFIG } from '../constants';
import { LoggerSentryConfigInterface } from '../../modules/logger/interfaces/logger-sentry-config.interface';

export const loggerSentryConfig = registerAs(
  LOGGER_SENTRY_MODULE_CONFIG,
  (): LoggerSentryConfigInterface => ({
    dsn: process.env.SENTRY_DSN ?? '',
    logLevelMap: (logLevel: LogLevel): SeverityLevel => {
      switch (logLevel) {
        case 'error':
          return 'error';
        case 'debug':
          return 'debug';
        case 'log':
          return 'log';
        case 'warn':
          return 'warning';
        case 'verbose':
          return 'info';
        default:
          return 'error';
      }
    },
  }),
);
