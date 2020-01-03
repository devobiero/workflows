import { Events, MicroKernel, PluginFactory, TYPES } from '@workflows/core';
import { AolPlugin, Calendar } from '@workflows/plugins';
import { CalendarController } from './controllers/CalendarController';
import { ProcessConfigLoader } from './config/env';
import container from './config/inversify.config';
import { Types } from './Types';
import ExpressServer from './ExpressServer';
import { RestAPIAdapter } from './RestAPIAdapter';

// load config file
ProcessConfigLoader.Load('/dist/.env');

// install plugins
// add decorator to do this on the fly
// on the server
const factory = new PluginFactory();
factory.install(new Calendar());
factory.install(new AolPlugin());

const kernel = new MicroKernel(factory);
const rest = new RestAPIAdapter(kernel);
// classname or type should be part of the request
const request = {
  type: 'calendar',
  body: {
    event: Events.Calendar,
  },
};
const service = rest.callService(request.type);
rest.createRequest(request, service);

const eventsController = container.get<CalendarController>(
  Types.CalenderController,
);

const apiServer = container.get<ExpressServer>(TYPES.Server);
apiServer.loadControllers([eventsController]);
apiServer.start();
