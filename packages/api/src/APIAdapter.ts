import { MicroKernel, Plugin } from '@workflows/core';
import { inject, injectable } from 'inversify';
import _ from 'lodash';
import { Adapter } from './interfaces/Adapter';
import { Types } from './Types';

@injectable()
export class APIAdapter implements Adapter {
  private kernel: MicroKernel;

  constructor(@inject(Types.Kernel) kernel: MicroKernel) {
    this.kernel = kernel;
  }

  async callService(event: any): Promise<any | undefined> {
    const types = Plugin.GetTypes();
    for (let i = 0; i < types.length; i++) {
      const name = types[i].name;
      const requiredKeys = types[i].eventKeys;
      if (_.every(requiredKeys, _.partial(_.has, event))) {
        return {
          name,
          receiver: this.kernel.findReceiver(name),
        };
      }
    }
    console.log(`No plugin manager found for ${JSON.stringify(event)}`);
    return undefined;
  }
}
