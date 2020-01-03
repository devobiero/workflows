import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { APIAdapter } from '../APIAdapter';
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

  private run(req: Request, response: Response): Response {
    const { body, type } = req.body;
    return response.send(
      this.adapter.callService(type)?.executeRequest({
        type,
        body,
      }),
    );
  }
}
