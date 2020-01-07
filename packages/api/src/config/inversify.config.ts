import { MicroKernel, PluginFactory } from '@workflows/core';
import * as registeredPlugins from '@workflows/plugins';
import { Container } from 'inversify';
import 'reflect-metadata';
import { APIAdapter } from '../APIAdapter';
import { GenericController } from '../controllers/GenericController';
import ExpressServer from '../ExpressServer';
import { Types } from '../Types';

// register plugins
Object.keys(registeredPlugins).forEach(plugin => {
  console.log(`Discovered ${plugin} plugin`);
});

const container = new Container();
container
  .bind<GenericController>(Types.GenericController)
  .to(GenericController);

const factory = new PluginFactory();

container.bind<APIAdapter>(Types.Adapter).to(APIAdapter);
container
  .bind<MicroKernel>(Types.Kernel)
  .toConstantValue(new MicroKernel(factory));

container
  .bind<ExpressServer>(Types.Server)
  .to(ExpressServer)
  .inSingletonScope();

export default container;
