export abstract class ILogger {
  abstract trace(message?: any, ...optionalParams: any[]): void;
  abstract debug(message?: any, ...optionalParams: any[]): void;
  abstract info(message?: any, ...optionalParams: any[]): void;
  abstract warn(message?: any, ...optionalParams: any[]): void;
  abstract error(message?: any, ...optionalParams: any[]): void;
}
