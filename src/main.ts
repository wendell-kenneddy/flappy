import './styles/main.css';

import { GlobalRenderer } from './engine/renderers/GlobalRenderer';
import { KeyboardInputSystem } from './engine/input-systems/KeyboardInputSystem';
import { CoreEngine } from './engine';
import { Rect } from './lib/primitives/Rect';
import { GROUND_Y, WORLD_X_START } from './data/constants';
import { Bird } from './lib/Bird';
import { PipeSpawnerScript } from './lib/scripts/PipeSpawner';

const canvas = document.getElementById('scene') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const keyboardInputSystem = new KeyboardInputSystem();
const globalRenderer = new GlobalRenderer(ctx);
const engine = new CoreEngine(keyboardInputSystem, globalRenderer);

const skyBox = new Rect({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  color: '#b0fbff',
});
const ground = new Rect({
  x: 0,
  y: GROUND_Y,
  width: canvas.width,
  height: canvas.height - GROUND_Y,
  color: '#2b1b0f',
});
const groundSurface = new Rect({
  x: 0,
  y: GROUND_Y,
  width: canvas.width,
  height: 5,
  color: '#379914',
});
const p1 = new Bird({
  x: WORLD_X_START + 50,
  y: 10,
  dy: 1,
  width: 10,
  height: 10,
  color: '#ff0000',
});
engine.AddGameObjects([skyBox, ground, groundSurface, p1]);
engine.AttachScript(
  new PipeSpawnerScript({
    spawnInterval: 60,
    pipePairConfig: {
      x: 330,
      y: 0,
      dx: 2,
      gap: 70,
      color: '#0000ff',
    },
  })
);
engine.Run();
