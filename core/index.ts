import { MicroKernel } from './MicroKernel';

export * from './PluginFactory';
export * from './MicroKernel';

const kernel = new MicroKernel();
kernel.loadPlugins();
