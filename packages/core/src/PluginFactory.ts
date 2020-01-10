import { IPlugin } from './MicroKernel';
import { Logger } from './shared/logger/Logger';

export class PluginFactory<T> {
  private plugins: IPlugin<T>[] = [];

  constructor(registeredPlugins: any) {
    PluginFactory.register(registeredPlugins);
    this.discoverSync();
  }

  private static register(plugins: any) {
    Object.keys(plugins).forEach(() => {});
  }

  public install(plugin: IPlugin<T>) {
    Logger.info(`Installing ${plugin.constructor.name} plugin`);
    this.plugins.push(plugin);
  }

  public uninstall(plugin: IPlugin<T>) {
    this.plugins.splice(this.plugins.indexOf(plugin), 1);
  }

  public getPlugins(): IPlugin<T>[] {
    return this.plugins;
  }

  private discoverSync(): void {
    const plugins = IPlugin.GetImplementations();
    for (const plugin of plugins) {
      this.install(new plugin());
    }
  }
}
