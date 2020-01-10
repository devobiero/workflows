import { EventEmitter } from 'events';
import { capitalize } from './index';
import { PluginFactory } from './PluginFactory';
import { Logger } from './shared/logger';

export interface IEventSignature {
  requiredKeys: Array<string>;
  name: string;
}

export namespace IPlugin {
  interface Constructor<T> {
    new (...args: any[]): T;
    readonly prototype: T;
  }

  const implementations: Constructor<IPlugin<any>>[] = [];
  const types: Set<any> = new Set<any>();

  export function GetImplementations(): Constructor<IPlugin<any>>[] {
    return implementations;
  }

  export function register<T extends Constructor<IPlugin<any>>>(ctor: T) {
    implementations.push(ctor);
    return ctor;
  }

  export function addEventSignature(type: any) {
    return (_target: any): void => {
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

  /**
   * IPlugin can subscribe to events accordingly and execute the callback function passed
   * @param eventName is required
   * @param callbackFunction is required
   * @constructor
   */
  static OnEvent(eventName: any, callbackFunction: (...args: any[]) => void) {
    this.getInstance().on(eventName, callbackFunction);
  }

  static Publish(eventName: any, args: any) {
    this.getInstance().emit(eventName, args);
  }
}

export class PluginManager {
  private plugin: IPlugin<any>;
  private kernel: MicroKernel;

  constructor(kernel: MicroKernel, plugin: IPlugin<any>) {
    this.kernel = kernel;
    this.plugin = plugin;
  }

  async executeRequest(name: string, request: any): Promise<any> {
    // call other internal servers e.g loggers, database analytics
    this.kernel.callInternalServer(request);
    this.kernel.sendMessage(name, request);
    return await this.plugin.run(request);
  }
}

export interface IPlugin<T> {
  /**
   * handles any in-house stuff before making it active
   * e.g notifying users of it's existence, subscribing to events
   */
  load(): void;
  run(args: any): Promise<T>;
  /**
   * handles any house cleaning duties e.g cleaning up resources
   */
  unload(): void;
}

/**
 * A singleton MicroKernel instance the co-ordinates all events received from
 * the API adapter
 */
export class MicroKernel {
  private readonly plugins: IPlugin<any>[];

  constructor(factory: PluginFactory<any>) {
    this.plugins = this.subscribe(factory);
  }

  getPlugins(): IPlugin<any>[] {
    return this.plugins;
  }

  // make list of plugins private field so that we
  // can only query once
  subscribe(factory: PluginFactory<any>): IPlugin<any>[] {
    const plugins: IPlugin<any>[] = factory.getPlugins();

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

  /**
   * The application core throws events.
   * so event listeners (plugins) can register on specific events without
   * having to listen to each single event thrown by the core.
   */
  sendMessage(type: string | symbol, data: any): void {
    EventManager.getInstance().emit(type, data);
  }

  // call some of internal facing server/plugin e.g logger
  callInternalServer(args: any): void {
    Logger.info('calling database server', args);
  }
}
