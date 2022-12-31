import { InputSystem, InputSystemState } from '../interfaces/InputSystem';

export class TouchClickInputSystem implements InputSystem {
  private readonly _scene = document.getElementById(
    'scene'
  ) as HTMLCanvasElement;
  private readonly _keys: Record<string, boolean> = {};
  private _running: boolean = false;

  public Start(): void {
    if (!this._running) {
      this._SetupListeners();
      this._running = true;
      return;
    }
  }

  public GetState(): InputSystemState {
    return {
      running: this._running,
      keys: this._keys,
    };
  }

  private _SetupListeners() {
    this._scene.onselectstart = () => false;
    this._scene.addEventListener('mousedown', () => this._SetActiveOn());
    this._scene.addEventListener('mouseup', () => this._SetActiveOff());

    if (window.TouchEvent) {
      this._scene.addEventListener('touchstart', () => this._SetActiveOn());
      this._scene.addEventListener('touchend', () => this._SetActiveOff());
    }
  }

  private _SetActiveOn() {
    this._keys['active'] = true;
  }

  private _SetActiveOff() {
    this._keys['active'] = false;
  }
}
