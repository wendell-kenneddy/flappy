import { InputSystem } from '../interfaces/InputSystem';

export class KeyboardInputSystem implements InputSystem {
  private readonly _keys: Record<string, boolean> = {};
  private _running: boolean = false;

  public Start() {
    if (!this._running) {
      window.addEventListener('keydown', (e) => {
        this._keys[e.key] = true;
      });
      window.addEventListener('keyup', (e) => {
        this._keys[e.key] = false;
      });
      this._running = true;
    }
  }

  public GetState() {
    return {
      keys: this._keys,
      running: this._running,
    };
  }
}
