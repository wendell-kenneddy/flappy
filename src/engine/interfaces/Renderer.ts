import { EngineState } from './Engine';
import { GameObject } from './GameObject';

export abstract class Renderer {
  abstract Render(gameObjects: GameObject[], engineState: EngineState): void;
  abstract Clear(): void;
}
