import { MicroKernel, Plugin, PluginManager } from '@workflows/core';
import { inject, injectable } from 'inversify';
import { Adapter } from './interfaces/Adapter';
import { Types } from './Types';
import _ from 'lodash'

@injectable()
export class APIAdapter implements Adapter {
  private kernel: MicroKernel;

  constructor(@inject(Types.Kernel) kernel: MicroKernel) {
    this.kernel = kernel;
  }

  callService(event: any): PluginManager | undefined {
    const types = Plugin.GetTypes();
    for (let i = 0; i < types.length; i++) {
      const name =  types[i].name;
      const requiredKeys = types[i].eventKeys;
      if (_.every(requiredKeys, _.partial(_.has, event))) {
        return this.kernel.findReceiver(name);
      }
    }

    return undefined;
  }
}
