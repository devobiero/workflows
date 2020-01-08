import { EventManager as _, EventSignature, Plugin } from '@workflows/core';
import { Service } from '../Types';

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
