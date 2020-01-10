import { ILogger } from './ILogger';

export abstract class Logger extends ILogger {
  static debug(message: string, ...optionalParams: any[]): void {
    Logger.emit('debug', message, optionalParams);
  }

  static error(message: string, ...optionalParams: any[]): void {
    Logger.emit('error', message, optionalParams);
  }

  static info(message: string, ...optionalParams: any[]): void {
    Logger.emit('info', message, optionalParams);
  }

  static trace(message: string, ...optionalParams: any[]): void {
    Logger.emit('trace', message, optionalParams);
  }

  static warn(message: string, ...optionalParams: any[]): void {
    Logger.emit('warn', message, optionalParams);
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
