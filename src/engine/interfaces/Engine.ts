import { GameObject } from './GameObject';
import { InputSystemState } from './InputSystem';
import { LogicScript } from './Scripts';

export type EngineStores = Record<string, any>;

export interface EngineState {
  stores: EngineStores;
  gameObjects: GameObject[];
  inputSystemState: InputSystemState;
  RequestDestroy: (id: string) => void;
  RequestCreate: (o: GameObject) => void;
}

export abstract class Engine {
  abstract Run(): void;
  abstract Stop(): void;
  abstract GetEngineState(): EngineState;
  abstract AddGameObjects: (o: GameObject[]) => void;
  abstract DestroyGameObject: (id: string) => void;
  abstract AttachScript: (script: LogicScript) => void;
}
