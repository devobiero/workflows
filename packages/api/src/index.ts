import { ProcessConfigLoader } from './config/env';
import container from './config/inversify.config';
import { CalendarController } from './controllers/CalendarController';
import ExpressServer from './ExpressServer';
import { Types } from './Types';

// load config file
ProcessConfigLoader.Load('/dist/.env');

const eventsController = container.get<CalendarController>(
  Types.CalenderController,
);

const apiServer = container.get<ExpressServer>(Types.Server);
apiServer.loadControllers([eventsController]);
apiServer.start();
