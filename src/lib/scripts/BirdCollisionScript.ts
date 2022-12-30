import { EngineState } from '../../engine/interfaces/Engine';
import { LogicScript } from '../../engine/interfaces/Scripts';
import { BirdState } from '../objects/Bird';
import { PipePairState } from '../objects/PipePair';

export class BirdCollisionScript implements LogicScript {
  public readonly id: string;

  constructor() {
    this.id = crypto.randomUUID();
  }

  Tick(state: EngineState): void {
    if (state.gameObjects.length < 6) return;

    const player = state.gameObjects[3];
    const firstPipePair = state.gameObjects[5];
    const playerState = player.GetState() as BirdState;
    const firstPipePairState = firstPipePair.GetState() as PipePairState;
    const firstPipe = firstPipePairState.firstPipe;
    const secondPipe = firstPipePairState.secondPipe;

    if (
      playerState.x + playerState.width > firstPipePairState.x &&
      playerState.x + playerState.width <
        firstPipePairState.x + firstPipePairState.width &&
      (playerState.y <= firstPipe.y + firstPipe.height ||
        playerState.y + playerState.height >= secondPipe.y)
    ) {
      state.stores['game-state'] = 0;
      return;
    }
  }

  Cancel(): void {}
}
