import { EventManager as _, Plugin } from '@workflows/core';
import { Service } from '../Types';

export interface Invite {
  id: string;
  name: string;
}

@Plugin.register
export class Calendar {
  load(): void {
    console.log('load from calendar plugin');
    _.subscribe(Service.TODO, () => {
      console.log('function from TODO event');
    });
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
