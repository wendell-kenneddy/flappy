import { GameObject } from '../../interfaces/GameObject';
import { GameInput } from '../../interfaces/Input';

export interface RectProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  height: number;
  supportsInputs: boolean;
  color?: string;
}

export class Rect implements GameObject {
  readonly id: string;
  readonly supportsInputs: boolean;

  constructor(private props: RectProps) {
    this.id = crypto.randomUUID();
    this.supportsInputs = props.supportsInputs;
  }

  public Draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.props.color ?? '#000';
    ctx.fillRect(
      this.props.x,
      this.props.y,
      this.props.width,
      this.props.height
    );
  }

  public Update(): void {}

  public OnInput(input: GameInput) {}
}
