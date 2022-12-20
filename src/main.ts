import './styles/main.css';

import { GlobalRenderer } from './core/renderers/GlobalRenderer';
import { WindowInputSystem } from './core/input-systems/WindowInputSystem';
import { Engine } from './core/Engine';
import { Player } from './lib/Player';
import { Rect } from './lib/primitives/Rect';
import { GROUND_Y } from './data/constants';

const canvas = document.getElementById('scene') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const windowInputSystem = new WindowInputSystem();
const globalRenderer = new GlobalRenderer(ctx);
const engine = new Engine(windowInputSystem, globalRenderer);

const ground = new Rect({
  x: 0,
  y: GROUND_Y,
  dy: 0,
  dx: 0,
  width: canvas.width,
  height: canvas.height - GROUND_Y,
  supportsInputs: false,
  color: '#ff0000',
});
const p1 = new Player({
  x: 10,
  y: 0,
  dx: 3,
  dy: 1,
  width: 10,
  height: 10,
  supportsInputs: true,
});
const p2 = new Player({
  x: 40,
  y: 0,
  dx: 4,
  dy: 3,
  width: 10,
  height: 10,
  supportsInputs: true,
});

engine.AddEntities([ground, p1, p2]);
engine.Run();
