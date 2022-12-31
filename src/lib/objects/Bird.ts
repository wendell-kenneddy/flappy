import { FRICTION_MULTIPLIER, GRAVITY, GROUND_Y } from '../../data/constants';
import { EngineState } from '../../engine/interfaces/Engine';
import { Rect, RectProps } from './Rect';

export interface BirdProps extends RectProps {
  dy: number;
}

export interface BirdState extends BirdProps {
  isJumping: boolean;
  verticalAcceleration: number;
}

export class Bird extends Rect {
  private _canJump = true;
  private _isJumping: boolean;
  private _vAcc: number;

  constructor(private _birdProps: BirdProps) {
    super(_birdProps);
    this._isJumping = _birdProps.y + _birdProps.height < GROUND_Y;
    this._vAcc = _birdProps.dy;
  }

  public Draw(ctx: CanvasRenderingContext2D): void {
    super.Draw(ctx);
  }

  public Update(s: EngineState): void {
    this.__engineState = s;
    this._ChangeMovementDirection();
    this._UpdateVerticalPosition();
  }

  public GetState(): BirdState {
    return {
      ...this._birdProps,
      isJumping: this._isJumping,
      verticalAcceleration: this._vAcc,
    };
  }

  private _Jump() {
    if (!this._canJump) return;

    this._vAcc = -4;
    this._isJumping = true;
  }

  private _ChangeMovementDirection() {
    const { keys } = this.__engineState.inputSystemState;

    if (keys['active']) this._Jump();
  }

  private _UpdateVerticalPosition() {
    if (this._birdProps.y + this._birdProps.height + this._vAcc > GROUND_Y) {
      this._birdProps.y = GROUND_Y - this._birdProps.height;
      this._canJump = true;
      this._isJumping = false;
      return;
    }

    this._CheckJumpCondition();

    this._vAcc += this._birdProps.dy * FRICTION_MULTIPLIER + GRAVITY;
    this._birdProps.y += this._isJumping ? this._vAcc : 0;
  }

  private _CheckJumpCondition() {
    if (this._birdProps.y - this._birdProps.height <= 0) {
      this._isJumping = true;
      this._canJump = false;
      return;
    }

    this._canJump = true;
  }
}
