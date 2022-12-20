import { GameObject } from '../../interfaces/GameObject';
import { InputKey, InputType } from '../../interfaces/Input';
import { InputSystem } from '../../interfaces/InputSystem';

export class WindowInputSystem implements InputSystem {
  private _hasStarted: boolean = false;
  private _subscribers: GameObject[] = [];

  public Start() {
    if (!this._hasStarted) {
      window.addEventListener('keydown', (e) => {
        this._CallOnInput(e, 'Press');
      });
      window.addEventListener('keyup', (e) => {
        this._CallOnInput(e, 'Release');
      });
      this._hasStarted = true;
    }
  }

  public Subscribe(s: GameObject) {
    this._subscribers.push(s);
  }

  public GetState() {
    return {
      subscribers: [...this._subscribers],
      running: this._hasStarted,
    };
  }

  public Unsubscribe(s: GameObject): void {
    this._subscribers = this._subscribers.filter((o) => o.id !== s.id);
  }

  public UnsubscribeAll() {
    this._subscribers.length = 0;
  }

  private _CallOnInput(e: KeyboardEvent, type: InputType) {
    const isValidInput = this._ValidateInput(e);
    if (!isValidInput) return;

    this._subscribers.forEach((s) =>
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
