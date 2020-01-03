import { Plugin } from './MicroKernel';

export class PluginFactory<T> {
  private plugins: Plugin<T>[] = [];

  public install(plugin: Plugin<T>) {
    this.plugins.push(plugin);
  }

  public uninstall(plugin: Plugin<T>) {
    this.plugins.splice(this.plugins.indexOf(plugin), 1);
  }

  public getPlugins(): Plugin<T>[] {
    return this.plugins;
  }
}
