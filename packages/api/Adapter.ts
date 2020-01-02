import { PluginManager } from '../core';
import { Request } from '../core/shared';

export interface Adapter {
  callService(name: string): PluginManager | undefined;

  createRequest(request: Request, service: PluginManager | undefined): void;
}
