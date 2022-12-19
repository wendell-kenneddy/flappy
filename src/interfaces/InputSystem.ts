import { GameObject } from './GameObject';

export type InputKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp';
export type InputType = 'Press' | 'Release';

export interface GameInput {
  key: InputKey;
  type: InputType;
}

export abstract class InputSystem {
  abstract Start(): void;
  abstract Subscribe(s: GameObject): void;
}
