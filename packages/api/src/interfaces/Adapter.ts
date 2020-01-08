import { PluginManager } from '@workflows/core';

export interface Adapter {
  callService(name: any): PluginManager | undefined;
}
