import { EventManager as _, EventSignature, Plugin } from '@workflows/core';
import { Todo } from '../todoist/Todo';

export interface Invite {
  id: string;
  name: string;
}

@Plugin.register
@Plugin.addEventSignature({
  eventKeys: ['id', 'name'],
  name: Calendar.name,
} as EventSignature)
export class Calendar {
  load(): void {
    console.log('load from calendar plugin');
    _.subscribe(Todo.name, data => console.log(`Got ${JSON.stringify(data)}`));
  }

  async run(args: any): Promise<Invite> {
    console.log('run main function on calendar plugin', args);
    const events: Invite[] = [
      {
        id: '1',
        name: 'Stand ups',
      },
    ];

    return events[0];
  }

  unload(): void {}
}
