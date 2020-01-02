import { Events, MicroKernel } from '../core';
import { RestAPIAdapter } from './rest/RestAPIAdapter';

const kernel = new MicroKernel();

const rest = new RestAPIAdapter(kernel);
const request = {
  type: 'calendar',
  body: {
    event: Events.Calendar,
  },
};
// classname or type should be part of the request
const service = rest.callService(request.type);

rest.createRequest(request, service);
