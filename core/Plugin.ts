export abstract class Plugin {
  abstract load(): void;
  abstract run(): void;
  abstract unload(): void;
}
