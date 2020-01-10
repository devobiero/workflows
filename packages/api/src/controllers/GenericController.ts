import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { APIAdapter } from '../APIAdapter';
import { logRoute } from '../decorators';
import { IController } from '../interfaces/IController';
import { Types } from '../Types';

@injectable()
export class GenericController implements IController<any> {
  public path: string = '/events';
  public router: any = Router();
  public adapter: APIAdapter;

  constructor(@inject(Types.Adapter) adapter: APIAdapter) {
    this.adapter = adapter;
    this.run = this.run.bind(this);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(this.path, this.run);
  }

  @logRoute
  private async run(req: Request, response: Response) {
    try {
      const handler = await this.adapter.callService(req.body);
      const data = await handler.receiver?.executeRequest(
        handler.name,
        req.body,
      );
      return response.send(data);
    } catch (e) {
      return response.status(400).send(e);
    }
  }
}
