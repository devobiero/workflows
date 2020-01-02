import { Request } from '@workflows/core';
import { PluginManager } from '@workflows/core';

export interface Adapter {
  callService(name: string): PluginManager | undefined;

  createRequest(request: Request, service: PluginManager | undefined): void;
}
