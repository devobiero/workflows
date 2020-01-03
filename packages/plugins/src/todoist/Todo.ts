import { EventManager, Plugin } from '@workflows/core';
import { Service } from '../Types';

export interface Item {
  id: string;
  name: string;
}

export class Todo implements Plugin<Item> {
  load(): void {
    console.log('load from todo plugin');
    EventManager.subscribe(Service.Calendar, () => {
      console.log('Todo function from event');
    });
  }

  run(args: any): Item {
    console.log('executing event on todo plugin', args);
    EventManager.publish(Service.TODO);
    return {
      id: '1',
      name: 'test',
    };
  }

  unload(): void {
    console.log('unload from todo plugin');
  }
}
