// import { Plugin } from '@workflows/core';
// todo: load from package
import { EventManager, Plugin } from '../../core';

export class WelcomePlugin implements Plugin {
  load(): void {
    console.log('load from welcome plugin');
    EventManager.subscribe('aol', () => {
      this.execute();
    });
  }

  execute(): void {
    console.log('execute event on welcome plugin');
  }

  unload(): void {}
}
