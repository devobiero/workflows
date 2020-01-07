import { Plugin } from './MicroKernel';

export class PluginFactory<T> {
  private plugins: Plugin<T>[] = [];

  constructor(registeredPlugins: any) {
    PluginFactory.register(registeredPlugins);
    this.discoverSync();
  }

  private static register(plugins: any) {
    Object.keys(plugins).forEach(() => {});
  }

  public install(plugin: Plugin<T>) {
    console.log(`Installing ${plugin.constructor.name} plugin`);
    this.plugins.push(plugin);
  }

  public uninstall(plugin: Plugin<T>) {
    this.plugins.splice(this.plugins.indexOf(plugin), 1);
  }

  public getPlugins(): Plugin<T>[] {
    return this.plugins;
  }

  private discoverSync(): void {
    const plugins = Plugin.GetImplementations();
    for (let i = 0; i < plugins.length; i++) {
      const panel = new plugins[i]();
      this.install(panel);
    }
  }
}
