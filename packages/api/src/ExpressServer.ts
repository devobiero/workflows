import { Logger } from '@workflows/core';
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import * as http from 'http';
import { injectable } from 'inversify';
import { IController } from './interfaces/IController';
import { IServer } from './interfaces/IServer';

@injectable()
export default class ExpressServer implements IServer {
  server: http.Server | undefined;
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.app.set('port', process.env.PORT || 8000);
    // Add Middleware
    this.addPlugins();
  }

  addPlugins(): void {
    // Setup body parsing - required for POST requests
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // Setup CORS
    this.app.use((_req, res, next): void => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT',
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization',
      );
      next();
    });
  }

  loadControllers(controllers: IController<any>[]): void {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  start(): void {
    // Start the server instance
    this.server = this.app.listen(this.app.get('port'), () => {
      Logger.info('Server is running on port ' + this.app.get('port'));
    });
  }
}
