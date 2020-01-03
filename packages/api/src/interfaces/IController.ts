import { APIAdapter } from '../APIAdapter';

export interface IController<T> {
  adapter: APIAdapter;
  path: string;
  router: T;
}
