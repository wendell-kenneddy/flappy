import { EngineState } from '../../engine/interfaces/Engine';
import { GameObject } from '../../engine/interfaces/GameObject';

export interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

export class Rect implements GameObject {
  protected __engineState: EngineState;
  public readonly id: string;

  constructor(private _props: RectProps) {
    this.id = crypto.randomUUID();
  }

  public Draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this._props.color ?? '#000';
    ctx.fillRect(
      this._props.x,
      this._props.y,
      this._props.width,
      this._props.height
    );
  }

  public Update(s: EngineState): void {
    this.__engineState = s;
  }

  public GetState() {}
}
