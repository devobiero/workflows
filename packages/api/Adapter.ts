import { PluginManager } from '../core';

export interface Adapter {
  callService(name: string): PluginManager | undefined;

  createRequest(service: PluginManager | undefined): void;
}
