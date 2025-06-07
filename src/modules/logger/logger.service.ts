import { ConsoleLogger, HttpException, Injectable } from '@nestjs/common';
import { LoggerTransportService } from './logger-transport.service';
import { LoggerTransportInterface } from './interfaces/logger-transport.interface';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(private readonly transportService: LoggerTransportService) {
    super();
  }

  exception(error: Error, message?: string, context?: string): void {
    if (!message) {
      message = error.message;
    }
    if (
      error instanceof HttpException &&
      error.getStatus() >= 400 &&
      error.getStatus() < 500
    ) {
      super.debug(message, context);
      this.transportService.log(message, 'debug', error);
    } else {
      super.error(message, error.stack, context);
      this.transportService.log(message, 'error', error);
    }
  }

  error(message: string, stack?: string, context?: string): void {
    super.error(message, stack, context);
    if (stack) {
      const error = new Error(message);
      error.stack = stack;
      this.transportService.log(message, 'error', error);
    } else {
      this.transportService.log(message, 'error');
    }
  }

  warn(message: string, context?: string): void {
    super.warn(message, context);
    this.transportService.log(message, 'warn');
  }

  debug(message: string, context?: string): void {
    super.debug(message, context);
    this.transportService.log(message, 'debug');
  }

  log(message: string, context?: string): void {
    super.log(message, context);
    this.transportService.log(message, 'log');
  }

  verbose(message: string, context?: string): void {
    super.verbose(message, context);
    this.transportService.log(message, 'verbose');
  }

  addTransport(transport: LoggerTransportInterface): void {
    this.transportService.addTransport(transport);
  }

  formatResponseMessage(
    req: Request,
    res: Response,
    startDate: Date,
    error?: Error,
  ): string {
    const { method, url } = req;
    const now = new Date();

    return (
      `${now.toISOString()} ${method} ${url} ${res.status}` +
      ` ${now.getTime() - startDate.getTime()}ms` +
      (error ? ` - ${error}` : '')
    );
  }
}
