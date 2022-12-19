import { GameObject } from '../interfaces/GameObject';
import { InputKey, InputSystem, InputType } from '../interfaces/InputSystem';

export class WindowInputSystem implements InputSystem {
  private readonly subscribers: GameObject[] = [];

  public Start() {
    window.addEventListener('keydown', (e) => {
      this._CallOnInput(e, 'Press');
    });
    window.addEventListener('keyup', (e) => {
      this._CallOnInput(e, 'Release');
    });
  }

  public Subscribe(s: GameObject) {
    this.subscribers.push(s);
  }

  private _CallOnInput(e: KeyboardEvent, type: InputType) {
    const isValidInput = this._ValidateInput(e);
    if (!isValidInput) return;

    this.subscribers.forEach((s) =>
      s.OnInput({
        type,
        key: e.key as InputKey,
      })
    );
  }

  private _ValidateInput(e: KeyboardEvent) {
    const key = e.key;

    return key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowRight';
  }
}
