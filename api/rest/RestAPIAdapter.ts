import { MicroKernel, Service } from '../../core';
import { Plugin } from '../../core';
import { Adapter } from '../Adapter';

export class RestAPIAdapter implements Adapter {
  private kernel: MicroKernel;

  constructor(kernel: MicroKernel) {
    this.kernel = kernel;
  }

  callService(name: string): Service {
    return this.kernel.findReceiver(name);
  }

  createRequest(service: Service): void {
    service.executeRequest();
  }
}
