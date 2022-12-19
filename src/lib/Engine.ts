import { GameObject } from '../interfaces/GameObject';
import { InputSystem } from '../interfaces/InputSystem';
import { Renderer } from '../interfaces/Renderer';

export class Engine {
  private readonly entities: GameObject[] = [];

  constructor(
    private readonly inputSystem: InputSystem,
    private readonly renderer: Renderer
  ) {}

  public Run() {
    this.inputSystem.Start();
    this._GameLoop();
  }

  private _GameLoop() {
    this.renderer.Render(this.entities);
    window.requestAnimationFrame(() => this._GameLoop());
  }

  public AddEntity(e: GameObject) {
    if (e.supportsInputs) this.inputSystem.Subscribe(e);
    this.entities.push(e);
  }
}
