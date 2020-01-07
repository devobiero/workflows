import { ILogger } from './ILogger';

export class ConsoleLogger implements ILogger {
  debug(message: string, ...optionalParams: any[]): void {
    ConsoleLogger.emit('debug', message, optionalParams);
  }

  error(message: string, ...optionalParams: any[]): void {
    ConsoleLogger.emit('error', message, optionalParams);
  }

  info(message: string, ...optionalParams: any[]): void {
    ConsoleLogger.emit('info', message, optionalParams);
  }

  trace(message: string, ...optionalParams: any[]): void {
    ConsoleLogger.emit('trace', message, optionalParams);
  }

  warn(message: string, ...optionalParams: any[]): void {
    ConsoleLogger.emit('warn', message, optionalParams);
  }

  private static emit(
    msgType: 'debug' | 'info' | 'warn' | 'error' | 'trace',
    message: string,
    optionalParams: any[],
  ) {
    if (optionalParams.length > 0) {
      console[msgType](message, optionalParams);
    } else {
      console[msgType](message);
    }
  }
}
