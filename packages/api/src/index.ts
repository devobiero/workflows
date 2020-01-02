import { Events, MicroKernel, PluginFactory } from '@workflows/core';
import { AolPlugin, Calendar } from '@workflows/plugins';
import { RestAPIAdapter } from './rest/RestAPIAdapter';
// install plugins
// add decorator to do this on the fly
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
