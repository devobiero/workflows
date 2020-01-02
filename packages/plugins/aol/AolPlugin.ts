import { EventManager, Plugin } from '../../core';
export class AolPlugin implements Plugin {
  load(): void {
    console.log('load from aol plugin');
    EventManager.subscribe('welcome', () => {
      this.execute();
    });
  }

  execute(): void {
    console.log('executing event on aol plugin');
    EventManager.publish('aol')
  }

  unload(): void {
    console.log('unload from aol plugin');
  }
}
