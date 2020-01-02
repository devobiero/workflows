import { MicroKernel } from '../core';
import { RestAPIAdapter } from './rest/RestAPIAdapter';

const kernel = new MicroKernel();

const rest = new RestAPIAdapter(kernel);
// classname or type should be part of the request
const service = rest.callService('welcome');
rest.createRequest(service);
