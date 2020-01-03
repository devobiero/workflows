import { IController } from './IController';

export interface IServer {
  server: any | undefined;
  addPlugins(): void;
  start(): void;
  loadControllers(controllers: IController<any>[]): void;
}
