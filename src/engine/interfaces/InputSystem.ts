export interface InputSystemState {
  running: boolean;
  keys: Record<string, boolean>;
}

export abstract class InputSystem {
  abstract Start(): void;
  abstract GetState(): InputSystemState;
}
