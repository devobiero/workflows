import { Plugin } from './MicroKernel';

export class PluginFactory {
  private plugins: Plugin[] = [];

  public install(plugin: Plugin) {
    this.plugins.push(plugin);
  }

  public uninstall(plugin: Plugin) {
    this.plugins.splice(this.plugins.indexOf(plugin), 1);
  }

  public getPlugins(): Plugin[] {
    return this.plugins;
  }
}
