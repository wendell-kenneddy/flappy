import { GameInput } from './InputSystem';

export abstract class GameObject {
  abstract readonly supportsInputs: boolean;
  abstract Draw(ctx: CanvasRenderingContext2D): void;
  abstract Update(): void;
  abstract OnInput(i: GameInput): void;
}
