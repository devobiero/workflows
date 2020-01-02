import { EventManager, Events, Plugin } from '@workflows/core';

export class Calendar implements Plugin {
  load(): void {
    console.log('load from calendar plugin');
    EventManager.subscribe(Events.Aol, () => {
      console.log('function from event');
    });
  }

  run(): void {
    console.log('run main function on calendar plugin');
  }

  unload(): void {}
}
