import { SeverityLevel } from '@sentry/node';

export class LoggerSentryConfigInterface {
  dsn: string;
  logLevelMap: (logLevel: string) => SeverityLevel;
}
