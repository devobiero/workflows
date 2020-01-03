import { Request, Response, Router } from 'express';
import { injectable } from 'inversify';
import { IController } from '../interfaces/IController';

interface Invite {
  id: string;
  name: string;
}

@injectable()
export class CalendarController implements IController<any> {
  public path: string = '/events';
  public router: any = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.path, this.getAllInvites);
    this.router.get(`${this.path}/:id`, this.getInviteById);
  }

  private getInviteById(request: Request, response: Response): void {
    const events: Invite[] = [
      {
        id: '1',
        name: 'Stand ups',
      },
    ];
    const id: string = request.params.id;
    const event = events.filter(e => e.id === id)[0];
    response.send(event);
  }

  private getAllInvites(_request: Request, response: Response) {
    const events: Invite[] = [
      {
        id: '1',
        name: 'Stand ups',
      },
    ];
    response.send(events);
  }
}
