import { Logger } from '@workflows/core';
import { Request, Response } from 'express';
export function logRoute(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    const req = args[0] as Request;
    const res = args[1] as Response;
    original.apply(this, args);
    Logger.info(
      `${req.ip} [${new Date().toISOString()}] ${req.hostname} ${
        req.originalUrl
      } ${req.method} ${res.statusCode} ${res.statusMessage} HTTP/${
        req.httpVersion
      }`,
    );
    if (['PUT', 'POST'].indexOf(req.method) > -1) {
      Logger.info(`\tBODY: ${JSON.stringify(req.body)}`);
    }
  };
}
