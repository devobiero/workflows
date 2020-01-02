import { EventEmitter } from 'events';
import { capitalize, Events, Request } from './index';
import { PluginFactory } from './PluginFactory';

// singleton EventManager class
export class EventManager {
  private static instance: EventManager;

  private constructor() {}

  public static getInstance(): EventEmitter {
    if (!EventManager.instance) {
      EventManager.instance = new EventEmitter();
    }

    return EventManager.instance as EventEmitter;
  }

  static subscribe(message: Events, callback: () => void) {
    this.getInstance().on(message, callback);
  }

  static publish(message: Events) {
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

  executeRequest(request: Request): void {
    if (request.body?.event) {
      this.kernel.emit(request.body?.event);
    }
    this.plugin.run();
    this.kernel.callInternalServer();
    // call other internal servers e.g loggers, database analytics
  }

  receiveRequest(): void {}
}

export abstract class Plugin {
  // handles any in-house stuff before making it active
  // e.g notifying users of it's existence, subscribing to events
  abstract load(): void;
  abstract run(): void;
  // handles any house cleaning duties
  // e.g cleaning up resources
  abstract unload(): void;
}

// make it a singleton
// we only need one instance running
export class MicroKernel {
  private readonly plugins: Plugin[];

  constructor(factory: PluginFactory) {
    this.plugins = this.subscribe(factory);
  }
  // make list of plugins private field so that we
  // can only query once
  subscribe(factory: PluginFactory): Plugin[] {
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
  emit(data: string | number): void {
    EventManager.getInstance().emit(data);
  }

  // call some of internal facing server/plugin e.g logger
  callInternalServer(): void {
    console.log('calling database server');
  }
}
