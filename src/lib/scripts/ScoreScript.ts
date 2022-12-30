import { EngineState } from '../../engine/interfaces/Engine';
import { LogicScript } from '../../engine/interfaces/Scripts';
import { BirdProps } from '../objects/Bird';
import { PipePairState } from '../objects/PipePair';

export class ScoreScript implements LogicScript {
  public readonly id: string;
  private _lastPastPipePairID: string;

  constructor() {
    this.id = crypto.randomUUID();
  }

  Tick(state: EngineState): void {
    if (!state.stores['score']) {
      state.stores['score'] = 0;
    }

    // skybox, ground, groundSurface, bird, score, pipePair
    if (state.gameObjects.length < 6) return;

    const player = state.gameObjects[3];
    const firstPipePair = state.gameObjects[5];
    const playerState = player.GetState() as BirdProps;
    const firstPipePairProps = firstPipePair.GetState() as PipePairState;

    if (firstPipePair.id === this._lastPastPipePairID) return;

    if (
      playerState.x + playerState.width >
      firstPipePairProps.x + firstPipePairProps.width
    ) {
      state.stores['score']++;
      this._lastPastPipePairID = firstPipePair.id;
      return;
    }
  }

  Cancel(): void {}
}
