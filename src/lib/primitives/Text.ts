import { EngineState } from '../../engine/interfaces/Engine';
import { GameObject } from '../../engine/interfaces/GameObject';

export interface TextProps {
  x: number;
  y: number;
  content: string | string[];
  font: string;
  color?: string;
  maxWidth?: number;
}

export class Text implements GameObject {
  public id: string;
  protected __engineState: EngineState;

  constructor(private readonly _props: TextProps) {
    this.id = crypto.randomUUID();
  }

  public Draw(ctx: CanvasRenderingContext2D) {
    const { content, font, x, y, color, maxWidth } = this._props;
    ctx.fillStyle = color ?? '#000';
    ctx.font = font;

    if (typeof content === 'string') {
      ctx.fillText(content, x, y, maxWidth);
      return;
    }

    for (let i = 0; i < content.length; i++) {
      ctx.fillText(content[i], x, y + i * 16, maxWidth);
    }
  }

  public Update(state: EngineState): void {
    this.__engineState = state;
  }
}
