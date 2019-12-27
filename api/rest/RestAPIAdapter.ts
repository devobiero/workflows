import { MicroKernel, Service } from '../../core';
import { Plugin } from '../../core';
import { Adapter } from '../Adapter';
const kernel = new MicroKernel();

export class RestAPIAdapter implements Adapter {
  callService(name: string): Plugin | Service {
    return kernel.findReceiver(name);
  }

  createRequest(service: Service): void {
    service.executeRequest();
  }
}
