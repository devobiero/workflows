import { Container } from 'inversify';
import 'reflect-metadata';
import { APIAdapter } from '../APIAdapter';
import { CalendarController } from '../controllers/CalendarController';
import ExpressServer from '../ExpressServer';
import { Types } from '../Types';
import {MicroKernel, PluginFactory} from "@workflows/core";
import {AolPlugin, Calendar} from "@workflows/plugins";

const container = new Container();

container
  .bind<CalendarController>(Types.CalenderController)
  .to(CalendarController);

const factory = new PluginFactory();
factory.install(new Calendar());
factory.install(new AolPlugin());

container.bind<APIAdapter>(Types.Adapter).to(APIAdapter);
container.bind<MicroKernel>(Types.Kernel).toConstantValue(new MicroKernel(factory))

container
  .bind<ExpressServer>(Types.Server)
  .to(ExpressServer)
  .inSingletonScope();

export default container;
