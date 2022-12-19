import './styles/main.css';

import { Rect } from './lib/Rect';
import { GlobalRenderer } from './lib/GlobalRenderer';
import { WindowInputSystem } from './lib/WindowInputSystem';
import { Engine } from './lib/Engine';

const canvas = document.getElementById('scene') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const windowInputSystem = new WindowInputSystem();
const globalRenderer = new GlobalRenderer(ctx);
const engine = new Engine(windowInputSystem, globalRenderer);

const p1 = new Rect(
  {
    x: canvas.width / 2,
    y: 10,
    dx: 1.5,
    dy: 4,
    width: 10,
    height: 10,
    color: '#34dbeb',
  },
  true
);
const p2 = new Rect(
  {
    x: canvas.width / 2 + 20,
    y: 10,
    dx: 3,
    dy: 1,
    width: 10,
    height: 10,
  },
  true
);
const p3 = new Rect(
  {
    x: canvas.width / 2 + 40,
    y: 10,
    dx: 2,
    dy: 4,
    width: 10,
    height: 10,
    color: '#f542da',
  },
  true
);
const p4 = new Rect(
  {
    x: canvas.width / 2 + 60,
    y: 10,
    dx: 5,
    dy: 1,
    width: 10,
    height: 10,
    color: '#ff0000',
  },
  true
);

engine.AddEntity(p1);
engine.AddEntity(p2);
engine.AddEntity(p3);
engine.AddEntity(p4);
engine.Run();
