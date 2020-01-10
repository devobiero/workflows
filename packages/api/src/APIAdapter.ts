import { IPlugin, Logger, MicroKernel } from '@workflows/core';
import { inject, injectable } from 'inversify';
import _ from 'lodash';
import { IAdapter } from './interfaces/IAdapter';
import { Types } from './Types';

@injectable()
export class APIAdapter implements IAdapter {
  private kernel: MicroKernel;

  constructor(@inject(Types.Kernel) kernel: MicroKernel) {
    this.kernel = kernel;
  }

  async callService(event: any): Promise<any | undefined> {
    const types = IPlugin.GetTypes();
    for (const signature of types) {
      const name = signature.name;
      const requiredKeys = signature.eventKeys;
      if (_.every(requiredKeys, _.partial(_.has, event))) {
        return {
          name,
          receiver: this.kernel.findReceiver(name),
        };
      }
    }
    Logger.info(`No plugin manager found for ${JSON.stringify(event)}`);
    return undefined;
  }
}
