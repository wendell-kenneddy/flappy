import { GameObject } from './GameObject';

export abstract class InputSystem {
  abstract Start(): void;
  abstract GetState(): any;
  abstract Subscribe(s: GameObject): void;
  abstract Unsubscribe(s: GameObject): void;
  abstract UnsubscribeAll(): void;
}
