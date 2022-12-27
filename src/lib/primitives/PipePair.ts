import { GROUND_Y, WORLD_X_START } from '../../data/constants';
import { EngineState } from '../../engine/interfaces/Engine';
import { GameObject } from '../../engine/interfaces/GameObject';
import { randomNumber } from '../utils/randomNumber';

export interface PipePairProps {
  x: number;
  y: number;
  dx: number;
  gap: number;
  color?: string;
}

interface Pipe {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class PipePair implements GameObject {
  public readonly id: string;
  private readonly _minHeight = 40;
  private readonly _minWidth = 30;
  private _pipe1: Pipe;
  private _pipe2: Pipe;

  constructor(private readonly _props: PipePairProps) {
    const randomHeight = this._GetRandomHeight();

    this.id = crypto.randomUUID();
    this._pipe1 = {
      x: _props.x,
      y: _props.y,
      width: this._minWidth,
      height: randomHeight,
    };
    this._pipe2 = {
      x: _props.x,
      y: randomHeight + _props.gap,
      width: this._minWidth,
      height: GROUND_Y - (randomHeight + _props.gap),
    };
  }

  Draw(ctx: CanvasRenderingContext2D): void {
    const p1 = this._pipe1;
    const p2 = this._pipe2;
    ctx.fillStyle = this._props.color ?? '#ff0000';
    ctx.fillRect(this._props.x, p1.y, p1.width, p1.height);
    ctx.fillRect(this._props.x, p2.y, p2.width, p2.height);
  }

  Update(state: EngineState): void {
    if (this._props.x + this._minWidth + this._props.dx < WORLD_X_START - 30) {
      console.log('Destroying self');
      state.RequestDestroy(this.id);

      return;
    }

    this._props.x -= this._props.dx;
  }

  private _GetRandomHeight() {
    return this._minHeight + randomNumber(1, 100);
  }
}
