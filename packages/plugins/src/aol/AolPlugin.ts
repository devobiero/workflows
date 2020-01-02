import { EventManager, Events, Plugin } from '@workflows/core';
export class AolPlugin implements Plugin {
  load(): void {
    console.log('load from aol plugin');
    EventManager.subscribe(Events.Calendar, () => {
      console.log('AOL function from event');
    });
  }

  run(): void {
    console.log('executing event on aol plugin');
    EventManager.publish(Events.Aol);
  }

  unload(): void {
    console.log('unload from aol plugin');
  }
}
