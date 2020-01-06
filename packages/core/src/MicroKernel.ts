import { EventEmitter } from 'events';
import { capitalize, Request } from './index';
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

  static subscribe(message: any, callback: () => void) {
    this.getInstance().on(message, callback);
  }

  static publish(message: any) {
    this.getInstance().emit(message);
  }
}

export class PluginManager {
  private plugin: Plugin<any>;
  private kernel: MicroKernel;

  constructor(kernel: MicroKernel, plugin: Plugin<any>) {
    this.kernel = kernel;
    this.plugin = plugin;
  }

  executeRequest(request: Request): any {
    if (request.body?.event) {
      this.kernel.emit(request.body?.event);
    }
    // call other internal servers e.g loggers, database analytics
    this.kernel.callInternalServer(request.body);
    return this.plugin.run(request.body);
  }

  receiveRequest(): void {}
}

export abstract class Plugin<T> {
  // handles any in-house stuff before making it active
  // e.g notifying users of it's existence, subscribing to events
  abstract load(): void;
  abstract run(args: any): T | void;
  // handles any house cleaning duties
  // e.g cleaning up resources
  abstract unload(): void;
}

// make it a singleton
// we only need one instance running
export class MicroKernel {
  private readonly plugins: Plugin<any>[];

  constructor(factory: PluginFactory<any>) {
    this.plugins = this.subscribe(factory);
  }
  // make list of plugins private field so that we
  // can only query once
  subscribe(factory: PluginFactory<any>): Plugin<any>[] {
    const plugins: Plugin<any>[] = factory.getPlugins();

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
  emit(data: string | symbol): void {
    EventManager.getInstance().emit(data);
  }

  // call some of internal facing server/plugin e.g logger
  callInternalServer(args: any): void {
    console.log('calling database server', args);
  }
}
