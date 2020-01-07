import { ProcessConfigLoader } from './config/env';
import container from './config/DI';
import { GenericController } from './controllers/GenericController';
import ExpressServer from './ExpressServer';
import { Types } from './Types';

// load config file
ProcessConfigLoader.Load('.env');

const eventsController = container.get<GenericController>(
  Types.GenericController,
);

const apiServer = container.get<ExpressServer>(Types.Server);
apiServer.loadControllers([eventsController]);
apiServer.start();
