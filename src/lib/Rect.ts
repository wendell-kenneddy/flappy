import { GLOBAL_DATA } from '../data/GlobalData';
import { GameObject } from '../interfaces/GameObject';
import { GameInput } from '../interfaces/InputSystem';

interface Props {
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  height: number;
  color?: string;
}

export class Rect implements GameObject {
  private isJumping: boolean;
  private movementDirection: 'left' | 'right' | null = null;
  private jumpCount: number = 2;
  private vAcc: number;

  constructor(private props: Props, readonly supportsInputs: boolean) {
    this.isJumping = props.y + props.height < GLOBAL_DATA.groundY;
    this.vAcc = props.dy;
  }

  public Draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.props.color ?? '#000';
    ctx.fillRect(
      this.props.x,
      this.props.y,
      this.props.width,
      this.props.height
    );
  }

  public Update(): void {
    this._UpdateVerticalPosition();
    this._UpdateHorizontalPosition();
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
    this.movementDirection = direction;
  }

  private _Jump() {
    if (this.jumpCount === 2) return;

    this.vAcc = -3;
    this.jumpCount++;
    this.isJumping = true;
  }

  private _UpdateHorizontalPosition() {
    if (!this.movementDirection) return;

    const willBeOutOfBounds =
      this.movementDirection === 'right'
        ? this.props.x + this.props.width + this.props.dx >=
          GLOBAL_DATA.worldXEnd
        : this.props.x + this.props.width - this.props.dx <=
          GLOBAL_DATA.worldXStart;

    if (willBeOutOfBounds) return;

    this.props.x +=
      this.movementDirection === 'right' ? this.props.dx : -this.props.dx;
  }

  private _UpdateVerticalPosition() {
    if (this.props.y + this.props.width + this.vAcc >= GLOBAL_DATA.groundY) {
      this.jumpCount = 0;
      this.isJumping = false;
    }

    this.vAcc += this.props.dy / 100 + GLOBAL_DATA.gravity;
    this.props.y += this.isJumping ? this.vAcc : 0;
  }
}
