import { EngineState } from './Engine';

export abstract class LogicScript {
  abstract readonly id: string;
  abstract Tick(s: EngineState): void;
  abstract Cancel(): void;
}
