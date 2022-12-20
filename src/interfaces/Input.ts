export type InputKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp';
export type InputType = 'Press' | 'Release';

export interface GameInput {
  key: InputKey;
  type: InputType;
}
