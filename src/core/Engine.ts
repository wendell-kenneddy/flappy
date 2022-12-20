import { GameObject } from '../interfaces/GameObject';
import { InputSystem } from '../interfaces/InputSystem';
import { Renderer } from '../interfaces/Renderer';

interface EngineState {
  running: boolean;
  entities: GameObject[];
}

export class Engine {
  private _entities: GameObject[] = [];
  private _animationID: number;
  private _running: boolean = false;

  constructor(
    private readonly _inputSystem: InputSystem,
    private readonly _renderer: Renderer
  ) {}

  public Run() {
    if (this._running) return;
    this._inputSystem.Start();
    this._StartGameLoop();
    this._running = true;
  }

  public Stop() {
    window.cancelAnimationFrame(this._animationID);
    this._inputSystem.UnsubscribeAll();
    this._entities.length = 0;
    this._running = false;
  }

  public GetState(): EngineState {
    return {
      entities: [...this._entities],
      running: this._running,
    };
  }

  public AddEntities(e: GameObject[]) {
    e.forEach((o) => {
      if (o.supportsInputs) this._inputSystem.Subscribe(o);
      this._entities.push(o);
    });
  }

  public RemoveEntity(e: GameObject) {
    this._inputSystem.Unsubscribe(e);
    this._entities = this._entities.filter((o) => o.id !== e.id);
  }

  private _StartGameLoop() {
    this._renderer.Render(this._entities);
    this._animationID = window.requestAnimationFrame(() =>
      this._StartGameLoop()
    );
  }
}
