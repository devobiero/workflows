import { MicroKernel, PluginFactory } from '@workflows/core';
import { Calendar, Todo } from '@workflows/plugins';
import { Container } from 'inversify';
import 'reflect-metadata';
import { APIAdapter } from '../APIAdapter';
import { GenericController } from '../controllers/GenericController';
import ExpressServer from '../ExpressServer';
import { Types } from '../Types';

const container = new Container();

container
  .bind<GenericController>(Types.GenericController)
  .to(GenericController);

const factory = new PluginFactory();
// install plugins programmatically
factory.install(new Calendar());
factory.install(new Todo());

container.bind<APIAdapter>(Types.Adapter).to(APIAdapter);
container
  .bind<MicroKernel>(Types.Kernel)
  .toConstantValue(new MicroKernel(factory));

container
  .bind<ExpressServer>(Types.Server)
  .to(ExpressServer)
  .inSingletonScope();

export default container;
