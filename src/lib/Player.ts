import {
  FRICTION_MULTIPLIER,
  GRAVITY,
  GROUND_Y,
  WORLD_X_END,
  WORLD_X_START,
} from '../data/constants';
import { GameInput } from '../interfaces/Input';
import { Rect, RectProps } from './primitives/Rect';

interface PlayerProps extends RectProps {}

export class Player extends Rect {
  private _isJumping: boolean;
  private _movementDirection: 'left' | 'right' | null = null;
  private _jumpCount: number = 2;
  private _vAcc: number;

  constructor(private playerProps: PlayerProps) {
    super(playerProps);
    this._isJumping = playerProps.y + playerProps.height < GROUND_Y;
    this._vAcc = playerProps.dy;
  }

  public Draw(ctx: CanvasRenderingContext2D): void {
    super.Draw(ctx);
  }

  public Update(): void {
    this._UpdateVerticalPosition();
    this._UpdateHorizontalPosition();
  }

  public GetState() {
    return {
      ...this.playerProps,
      isJumping: this._isJumping,
      jumpCount: this._jumpCount,
      movementDirection: this._movementDirection,
      verticalAcceleration: this._vAcc,
    };
  }

  public OnInput(input: GameInput): void {
    const { key, type } = input;

    if (
      (type === 'Release' && key === 'ArrowLeft') ||
      (type === 'Release' && key === 'ArrowRight')
    ) {
      this._ChangeMovementDirection(null);
      return;
    }

    if (type === 'Press') {
      if (key === 'ArrowUp') {
        this._Jump();
        return;
      }

      if (key === 'ArrowLeft') {
        this._ChangeMovementDirection('left');
        return;
      }

      if (key === 'ArrowRight') {
        this._ChangeMovementDirection('right');
        return;
      }
    }
  }

  private _ChangeMovementDirection(direction: 'left' | 'right' | null) {
    this._movementDirection = direction;
  }

  private _Jump() {
    if (this._jumpCount === 2) return;

    this._vAcc = -10;
    this._jumpCount++;
    this._isJumping = true;
  }

  private _UpdateHorizontalPosition() {
    if (!this._movementDirection) return;

    if (
      this._movementDirection === 'right' &&
      this.playerProps.x + this.playerProps.width + this.playerProps.dx >
        WORLD_X_END
    ) {
      this.playerProps.x = WORLD_X_END - this.playerProps.width;
      return;
    }

    if (
      this._movementDirection === 'left' &&
      this.playerProps.x - this.playerProps.dx < WORLD_X_START
    ) {
      this.playerProps.x = WORLD_X_START;
      return;
    }

    this.playerProps.x +=
      this._movementDirection === 'right'
        ? this.playerProps.dx
        : -this.playerProps.dx;
  }

  private _UpdateVerticalPosition() {
    if (this.playerProps.y + this.playerProps.height + this._vAcc > GROUND_Y) {
      this._jumpCount = 0;
      this._isJumping = false;
      this.playerProps.y = GROUND_Y - this.playerProps.height;
      return;
    }

    this._vAcc += this.playerProps.dy * FRICTION_MULTIPLIER + GRAVITY;
    this.playerProps.y += this._isJumping ? this._vAcc : 0;
  }
}
