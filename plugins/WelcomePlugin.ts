import { Plugin } from '@workflows/core';

export class WelcomePlugin extends Plugin {
  load(): void {
    console.log('hello')
  }

  run(): void {}

  unload(): void {}
}
