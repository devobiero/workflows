import { ProcessConfigLoader } from './config/env';
import container from './config/inversify.config';
import { GenericController } from './controllers/GenericController';
import ExpressServer from './ExpressServer';
import { Types } from './Types';

// load config file
ProcessConfigLoader.Load('/dist/.env');

const eventsController = container.get<GenericController>(
  Types.GenericController,
);

const apiServer = container.get<ExpressServer>(Types.Server);
apiServer.loadControllers([eventsController]);
apiServer.start();
