import { MicroKernel } from '../core/MicroKernel';
import { RestAPIAdapter } from './rest/RestAPIAdapter';
const rest = new RestAPIAdapter();
rest.callService('aol');
