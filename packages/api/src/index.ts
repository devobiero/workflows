import { Events, MicroKernel } from '@workflows/core';
import { RestAPIAdapter } from './rest/RestAPIAdapter';

const kernel = new MicroKernel();

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

