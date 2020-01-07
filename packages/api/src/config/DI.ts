import { DI as container, MicroKernel, PluginFactory } from '@workflows/core';
import 'reflect-metadata';
import { APIAdapter } from '../APIAdapter';
import { GenericController } from '../controllers/GenericController';
import ExpressServer from '../ExpressServer';
import { Types } from '../Types';

import * as registeredPlugins from '@workflows/plugins';

container
  .bind<GenericController>(Types.GenericController)
  .to(GenericController);

const factory = new PluginFactory(registeredPlugins);

container.bind<APIAdapter>(Types.Adapter).to(APIAdapter);
container
  .bind<MicroKernel>(Types.Kernel)
  .toConstantValue(new MicroKernel(factory));

container
  .bind<ExpressServer>(Types.Server)
  .to(ExpressServer)
  .inSingletonScope();

export default container;
