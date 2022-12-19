import { GameObject } from './GameObject';

export abstract class Renderer {
  abstract Render(entities: GameObject[]): void;
}
