// import { Plugin } from '@workflows/core';
// todo: load from package
import { Plugin } from '../../core';

export class WelcomePlugin implements Plugin {
  load(): void {
    console.log('load from welcome plugin');
  }

  run(): void {
    console.log('run from welcome plugin');
  }

  unload(): void {}
}
