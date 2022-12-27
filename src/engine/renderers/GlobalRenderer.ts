import { GameObject } from '../interfaces/GameObject';
import { Renderer } from '../interfaces/Renderer';
import { EngineState } from '../interfaces/Engine';

export class GlobalRenderer implements Renderer {
  constructor(private readonly _ctx: CanvasRenderingContext2D) {}

  public Render(gameObjects: GameObject[], engineState: EngineState) {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    gameObjects.forEach((e) => {
      e.Update(engineState);
      e.Draw(this._ctx);
    });
  }

  public Clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  }
}
