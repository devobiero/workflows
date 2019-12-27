import { Plugin } from '../../core';

export class AolPlugin implements Plugin {
  load(): void {
    console.log('load from aol plugin');
  }

  run(): void {
    console.log('run from aol plugin');
  }

  unload(): void {
    console.log('unload from aol plugin');
  }
}
