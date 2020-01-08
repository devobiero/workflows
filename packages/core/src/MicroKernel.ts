import { EventEmitter } from 'events';
import { capitalize } from './index';
import { PluginFactory } from './PluginFactory';

export interface EventSignature {
  eventKeys: Array<string>;
  name: string;
}

export namespace Plugin {
  interface Constructor<T> {
    new (...args: any[]): T;
    readonly prototype: T;
  }

  const implementations: Constructor<Plugin<any>>[] = [];
  const types: Set<any> = new Set<any>();

  export function GetImplementations(): Constructor<Plugin<any>>[] {
    return implementations;
  }

  export function register<T extends Constructor<Plugin<any>>>(ctor: T) {
    implementations.push(ctor);
    return ctor;
  }

  export function addEventSignature(type: any) {
    // @ts-ignore
    return function(target) {
      // validate event keys, check if not unique
      types.add(type);
    };
  }

  export function GetTypes() {
    return [...types];
  }
}

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

  async executeRequest(request: any): Promise<any> {
    // todo: get events from plugin names
    // if (request.body?.event) {
    //   this.kernel.emit(request.body?.event);
    // }
    // call other internal servers e.g loggers, database analytics
    this.kernel.callInternalServer(request);
    return await this.plugin.run(request);
  }

  receiveRequest(): void {}
}

export interface Plugin<T> {
  // handles any in-house stuff before making it active
  // e.g notifying users of it's existence, subscribing to events
  load(): void;
  run(args: any): Promise<T>;
  // handles any house cleaning duties
  // e.g cleaning up resources
  unload(): void;
}

// make it a singleton
// we only need one instance running
export class MicroKernel {
  private readonly plugins: Plugin<any>[];

  constructor(factory: PluginFactory<any>) {
    this.plugins = this.subscribe(factory);
  }

  getPlugins(): Plugin<any>[] {
    return this.plugins;
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
