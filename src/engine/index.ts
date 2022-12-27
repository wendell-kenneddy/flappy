import { Engine, EngineStores } from './interfaces/Engine';
import { GameObject } from './interfaces/GameObject';
import { InputSystem } from './interfaces/InputSystem';
import { Renderer } from './interfaces/Renderer';
import { LogicScript } from './interfaces/Scripts';

export class CoreEngine implements Engine {
  private _scripts: LogicScript[] = [];
  private _stores: EngineStores = {};
  private _gameObjects: GameObject[] = [];
  private _animationID: number;

  constructor(
    private readonly _inputSystem: InputSystem,
    private readonly _renderer: Renderer
  ) {}

  public Run() {
    if (this._stores['game-state'] === 1) return;

    this._inputSystem.Start();
    this._animationID = window.requestAnimationFrame(() => this._GameLoop());
    this._stores['game-state'] === 1;
  }

  public Stop() {
    window.cancelAnimationFrame(this._animationID);
    this._gameObjects.length = 0;
    this._stores['game-state'] = 0;
  }

  public GetEngineState() {
    return {
      stores: this._stores,
      gameObjects: [...this._gameObjects],
      inputSystemState: this._inputSystem.GetState(),
      RequestDestroy: (id: string) => this.DestroyGameObject(id),
      RequestCreate: (o: GameObject) => this.AddGameObjects([o]),
    };
  }

  public AddGameObjects(e: GameObject[]) {
    this._gameObjects = [...this._gameObjects, ...e];
  }

  public DestroyGameObject(id: string) {
    this._gameObjects = this._gameObjects.filter((o) => o.id !== id);
  }

  public AttachScript(script: LogicScript) {
    this._scripts.push(script);
  }

  private _GameLoop() {
    if (this._stores['game-state'] === 0) return this.Stop();
    this._scripts.forEach((s) => s.Tick(this.GetEngineState()));
    this._renderer.Render(this._gameObjects, this.GetEngineState());
    this._animationID = window.requestAnimationFrame(() => this._GameLoop());
  }
}
