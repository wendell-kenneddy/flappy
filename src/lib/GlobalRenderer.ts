import { GLOBAL_DATA } from '../data/GlobalData';
import { GameObject } from '../interfaces/GameObject';
import { Renderer } from '../interfaces/Renderer';

export class GlobalRenderer implements Renderer {
  constructor(private readonly ctx: CanvasRenderingContext2D) {}

  public Render(entities: GameObject[]) {
    this._DrawGround();
    this._UpdateEntities(entities);
    this._DrawEntities(entities);
  }

  private _UpdateEntities(entities: GameObject[]) {
    entities.forEach((e) => e.Update());
  }

  private _DrawEntities(entities: GameObject[]) {
    entities.forEach((e) => e.Draw(this.ctx));
  }

  private _DrawGround() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = '#594f4f';
    this.ctx.fillRect(
      0,
      GLOBAL_DATA.groundY,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
  }
}
