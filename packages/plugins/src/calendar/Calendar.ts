import {
  EventManager,
  IEventSignature,
  IPlugin,
  Logger,
} from '@workflows/core';
import { Todo } from '../todoist/Todo';

export interface IInvite {
  id: string;
  name: string;
}

@IPlugin.register
@IPlugin.addEventSignature({
  requiredKeys: ['id', 'name'],
  name: Calendar.name,
} as IEventSignature)
export class Calendar {
  load(): void {
    Logger.info('load from calendar plugin');
    EventManager.OnEvent(Todo.name, data =>
      console.log(`Got ${JSON.stringify(data)}`),
    );
  }

  async run(args: any): Promise<IInvite> {
    Logger.info('run main function on calendar plugin', args);
    const events: IInvite[] = [
      {
        id: '1',
        name: 'Stand ups',
      },
    ];

    return events[0];
  }

  unload(): void {
    Logger.info('unload from calendar plugin');
  }
}
