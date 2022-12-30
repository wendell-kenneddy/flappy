import { GROUND_Y, WORLD_X_START } from '../../data/constants';
import { EngineState } from '../../engine/interfaces/Engine';
import { GameObject } from '../../engine/interfaces/GameObject';

export interface ScoreProps {
  color?: string;
  font?: string;
}

export class Score implements GameObject {
  public readonly id: string;
  private _score: number = 0;

  constructor(private readonly _props: ScoreProps) {
    this.id = crypto.randomUUID();
  }

  Draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this._props.color ?? '#ffffff';
    ctx.font = this._props.font ?? '16px Arial, sans-serif';
    ctx.fillText(`Score: ${this._score}`, WORLD_X_START + 16, GROUND_Y + 28);
  }

  Update(state: EngineState): void {
    const score = state.stores['score'] as number;
    this._score = score ?? 0;
  }

  GetState() {}
}
