import { AolPlugin } from "../plugins/aol/AolPlugin";
import { PluginFactory } from "./PluginFactory";

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
  load(): void;
  run(): void;
  unload(): void;
}

export class MicroKernel {
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

  sendMessage(): void {}

  callInternalServer(): void {}
}
