// @ts-ignore
import { EventEmitter } from 'events';
import { PluginFactory } from './PluginFactory';
import { capitalize } from './shared/utils';

// singleton EventManager class
export class EventManager {
  private static instance: EventManager;

  private constructor() {}

  public static getInstance(): EventEmitter {
    if (!EventManager.instance) {
      EventManager.instance = new EventEmitter();
    }

    return EventManager.instance;
  }

  static subscribe(message: string, callback: () => void) {
    this.getInstance().on(message, callback);
  }

  static publish(message: string) {
    this.getInstance().emit(message);
  }
}

export class PluginManager {
  private plugin: Plugin;
  private kernel: MicroKernel;

  constructor(kernel: MicroKernel, plugin: Plugin) {
    this.kernel = kernel;
    this.plugin = plugin;
  }

  executeRequest(): void {
    // this.kernel.runAll();
    this.kernel.emit('welcome');
    // call other internal servers e.g loggers, database analytics
  }

  receiveRequest(): void {}
}

export abstract class Plugin {
  // handles any in-house stuff before making it active
  // e.g notifying users of it's existence
  abstract load(): void;
  abstract execute(): void;
  // handles any house cleaning duties
  // e.g cleaning up resources
  abstract unload(): void;
}

// make it a singleton
// we only need one instance running
export class MicroKernel {
  private readonly plugins: Plugin[];

  constructor() {
    this.plugins = this.subscribe();
  }
  // make list of plugins private field so that we
  // can only query once
  subscribe(): Plugin[] {
    const factory = new PluginFactory();
    const plugins: Plugin[] = factory.getPlugins();

    for (const plugin of plugins) {
      plugin.load();
    }

    return plugins;
  }

  findReceiver(name: string): PluginManager | undefined {
    for (const plugin of this.plugins) {
      const className = plugin.constructor.name;
      if (className.includes(capitalize(name))) {
        return new PluginManager(this, plugin);
      }
    }

    return undefined;
  }

  createHandle(): void {}

  /**
   * The application core throws events.
   * so event listeners (plugins) can register on specific events without
   * having to listen to each single event thrown by the core.
   */
  emit(data: string | undefined): void {
    EventManager.getInstance().emit(data);
  }

  // call some of internal facing server/plugin e.g logger
  callInternalServer(): void {}
}
