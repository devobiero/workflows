import { MicroKernel, PluginManager } from '@workflows/core';
import { Request } from '@workflows/core';
import {inject, injectable} from 'inversify';
import { Adapter } from './interfaces/Adapter';
import {Types} from "./Types";

@injectable()
export class APIAdapter implements Adapter {
  private kernel: MicroKernel;

  constructor(@inject(Types.Kernel) kernel: MicroKernel) {
    this.kernel = kernel;
  }

  callService(name: string): PluginManager | undefined {
    return this.kernel.findReceiver(name);
  }

  createRequest(request: Request, service: PluginManager | undefined): void {
    service?.executeRequest(request);
  }
}
