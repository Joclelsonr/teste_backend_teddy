import { Inject, LogLevel } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { LoggerTransportInterface } from './interfaces/logger-transport.interface';
import { loggerConfig } from 'src/common/config/logger.config';

export class LoggerTransportService {
  private readonly logLevels: LogLevel[] = ['error'];
  private readonly loggerTransports: LoggerTransportInterface[] = [];
  constructor(
    @Inject(loggerConfig.KEY)
    private config: ConfigType<typeof loggerConfig>,
  ) {
    if (this.config?.transportLogLevel) {
      this.logLevels = this.config.transportLogLevel as LogLevel[];
    }
  }

  public addTransport(transport: LoggerTransportInterface) {
    this.loggerTransports.push(transport);
  }

  public log(message: string, logLevel: LogLevel, error?: Error): void {
    if (this.logLevels.includes(logLevel)) {
      this.loggerTransports.map((loggerTransport) =>
        loggerTransport.log(message, logLevel, error),
      );
    }
  }
}
