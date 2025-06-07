import { LogLevel } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { LOGGER_MODULE_CONFIG } from '../constants';
import { LoggerConfigInterface } from '../../modules/logger/interfaces/logger.interface';

export const loggerConfig = registerAs(
  LOGGER_MODULE_CONFIG,
  (): LoggerConfigInterface => ({
    logLevel: process.env.LOG_LEVEL
      ? splitLogLevel(process.env.LOG_LEVEL)
      : ['error'],
    transportLogLevel: process.env.TRANSPORT_LEVEL
      ? splitLogLevel(process.env.TRANSPORT_LEVEL)
      : ['error'],
  }),
);

/**
 * Helper function to split log level string and assign to correct log level type
 * @param logLevel
 * @returns
 */
function splitLogLevel(logLevel: string): LogLevel[] {
  const levelTypes: string[] = logLevel.split(',');
  return levelTypes.map((levelType: string) => levelType.trim() as LogLevel);
}
