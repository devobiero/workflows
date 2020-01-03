import { Container } from 'inversify';
import 'reflect-metadata';
import { CalendarController } from '../controllers/CalendarController';
import { Types } from '../Types';
import ExpressServer from '../ExpressServer';

const container = new Container();

container
  .bind<CalendarController>(Types.CalenderController)
  .to(CalendarController);

container
  .bind<ExpressServer>(Types.Server)
  .to(ExpressServer)
  .inSingletonScope();

export default container;
