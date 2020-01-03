import { EventManager, Plugin } from '@workflows/core';
import { Service } from '../Types';

export interface Invite {
  id: string;
  name: string;
}

export class Calendar implements Plugin<Invite> {
  load(): void {
    console.log('load from calendar plugin');
    EventManager.subscribe(Service.TODO, () => {
      console.log('function from TODO event');
    });
  }

  run(args: any): Invite {
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
