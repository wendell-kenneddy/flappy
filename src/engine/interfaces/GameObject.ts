export abstract class GameObject {
  abstract readonly id: string;
  abstract Draw(ctx: CanvasRenderingContext2D): void;
  abstract Update(state: any): void;
  abstract GetState(): any;
}
