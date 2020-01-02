import { MicroKernel, PluginManager } from '../../core';
import { Adapter } from '../Adapter';

export class RestAPIAdapter implements Adapter {
  private kernel: MicroKernel;

  constructor(kernel: MicroKernel) {
    this.kernel = kernel;
  }

  callService(name: string): PluginManager | undefined {
    return this.kernel.findReceiver(name);
  }

  createRequest(service: PluginManager | undefined): void {
    service?.executeRequest();
  }
}
