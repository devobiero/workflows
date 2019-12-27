import { AolPlugin } from '../plugins/aol/AolPlugin';
import { WelcomePlugin } from '../plugins/welcome/WelcomePlugin';
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
    this.install(new WelcomePlugin());
    this.install(new AolPlugin());
    return this.plugins;
  }
}
