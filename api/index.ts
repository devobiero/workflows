import { MicroKernel } from '../core';
import { RestAPIAdapter } from './rest/RestAPIAdapter';

const kernel = new MicroKernel();

const rest = new RestAPIAdapter(kernel);
const service = rest.callService('aol');
rest.createRequest(service);
