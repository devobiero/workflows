import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { APIAdapter } from '../APIAdapter';
import { IController } from '../interfaces/IController';
import { Types } from '../Types';
import {Events, Request as CoreRequest} from "@workflows/core";

export interface Invite {
  id: string;
  name: string;
}

@injectable()
export class CalendarController implements IController<any> {
  public path: string = '/events';
  public router: any = Router();
  public adapter: APIAdapter;

  constructor(@inject(Types.Adapter) adapter: APIAdapter) {
    this.adapter = adapter;
    this.getAllInvites = this.getAllInvites.bind(this);
    this.getInviteById = this.getInviteById.bind(this);
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
    const request: CoreRequest = {
      type: Plugin.name,
      body: {
        event: Events.Calendar
      }
    };
    const service = this.adapter.callService('calendar');
    service?.executeRequest(request);
    const events: Invite[] = [
      {
        id: '1',
        name: 'Stand ups',
      },
    ];
    response.send(events);
  }
}
