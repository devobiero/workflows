// import { AolPlugin } from '../../plugins';
// import { Calendar } from '../../plugins';
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
    // todo plugins should be loaded from configuration files
    // this.install(new Calendar());
    // this.install(new AolPlugin());
    return this.plugins;
  }
}
