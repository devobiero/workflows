import { PluginManager } from '@workflows/core';

export interface Adapter {
  callService(name: string): PluginManager | undefined;
}
