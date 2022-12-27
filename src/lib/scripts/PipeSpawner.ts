import { EngineState } from '../../engine/interfaces/Engine';
import { LogicScript } from '../../engine/interfaces/Scripts';
import { PipePair, PipePairProps } from '../primitives/PipePair';

interface PipeSpawnerScriptProps {
  spawnInterval: number;
  pipePairConfig: PipePairProps;
}

export class PipeSpawnerScript implements LogicScript {
  private _spawnInterval = 60;
  private _frameCount = 0;

  constructor(private readonly _props: PipeSpawnerScriptProps) {
    this._spawnInterval = _props.spawnInterval;
  }

  Tick(s: EngineState): void {
    if (this._frameCount === this._spawnInterval) {
      console.log('Spawning new PipePair');
      s.RequestCreate(new PipePair({ ...this._props.pipePairConfig }));
      this._frameCount = 0;
      return;
    }

    this._frameCount++;
  }

  Cancel(): void {}
}
