import { AolPlugin } from '../plugins/aol/AolPlugin';
import { PluginFactory } from './PluginFactory';

export class Service {
  private plugin: Plugin;

  constructor(plugin: Plugin) {
    this.plugin = plugin;
  }

  executeRequest(): void {
    this.plugin.run();
  }

  receiveRequest(): void {}
}

export interface Plugin {
  // handles any in-house stuff before making it active
  // e.g notifying users of it's existence
  load(): void;
  run(): void;
  // handles any house cleaning duties
  // e.g cleaning up resources
  unload(): void;
}

// make it a singleton
// we only need one instance running
export class MicroKernel {
  constructor() {
    this.loadPlugins();
  }
  // make list of plugins private field so that we
  // can only query once
  loadPlugins(): void {
    const factory = new PluginFactory();
    const plugins: Plugin[] = factory.getPlugins();

    for (const plugin of plugins) {
      plugin.load();
    }
  }

  findReceiver(name: string): Service {
    // const factory = new PluginFactory();
    // const plugins: Plugin[] = factory.getPlugins();
    return new Service(new AolPlugin());
  }

  executeMechanism(): void {}

  createHandle(): void {}

  // emit messages
  sendMessage(): void {}

  // call some of internal facing server/plugin e.g logger
  callInternalServer(): void {}
}
