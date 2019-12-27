import { Plugin, Service } from '../core';

export interface Adapter {
  callService(name: string): Plugin | Service;
  createRequest(service: Service): void;
}
