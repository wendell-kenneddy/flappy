import { EngineState } from './Engine';

export abstract class LogicScript {
  abstract Tick(s: EngineState): void;
  abstract Cancel(): void;
}
