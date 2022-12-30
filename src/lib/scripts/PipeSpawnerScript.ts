import { EngineState } from '../../engine/interfaces/Engine';
import { LogicScript } from '../../engine/interfaces/Scripts';
import { PipePair, PipePairProps } from '../objects/PipePair';

interface PipeSpawnerScriptProps {
  spawnInterval: number;
  pipePairConfig: PipePairProps;
}

export class PipeSpawnerScript implements LogicScript {
  public readonly id: string;
  private _spawnInterval = 60;
  private _frameCount = 0;

  constructor(private readonly _props: PipeSpawnerScriptProps) {
    this.id = crypto.randomUUID();
    this._spawnInterval = _props.spawnInterval;
  }

  Tick(s: EngineState): void {
    if (this._frameCount === this._spawnInterval) {
      s.RequestCreate(new PipePair({ ...this._props.pipePairConfig }));
      this._frameCount = 0;
      return;
    }

    this._frameCount++;
  }

  Cancel(): void {}
}
