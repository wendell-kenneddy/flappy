import { GameObject } from '../../interfaces/GameObject';
import { Renderer } from '../../interfaces/Renderer';

export class GlobalRenderer implements Renderer {
  constructor(private readonly _ctx: CanvasRenderingContext2D) {}

  public Render(entities: GameObject[]) {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    this._UpdateEntities(entities);
    this._DrawEntities(entities);
  }

  public Clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  }

  private _UpdateEntities(entities: GameObject[]) {
    entities.forEach((e) => e.Update());
  }

  private _DrawEntities(entities: GameObject[]) {
    entities.forEach((e) => e.Draw(this._ctx));
  }
}
