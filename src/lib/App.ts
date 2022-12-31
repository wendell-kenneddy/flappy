import { GROUND_Y, WORLD_X_START } from '../data/constants';
import { CoreEngine } from '../engine/CoreEngine';
import { TouchClickInputSystem } from '../engine/input-systems/TouchClickInputSystem';
import { GlobalRenderer } from '../engine/renderers/GlobalRenderer';
import { Bird } from './objects/Bird';
import { Rect } from './objects/Rect';
import { Score } from './objects/Score';
import { BirdCollisionScript } from './scripts/BirdCollisionScript';
import { PipeSpawnerScript } from './scripts/PipeSpawnerScript';
import { ScoreScript } from './scripts/ScoreScript';

export class App {
  private readonly _canvas = document.getElementById(
    'scene'
  ) as HTMLCanvasElement;
  private readonly _playButton = document.getElementById(
    'play'
  ) as HTMLButtonElement;
  private readonly _globalRenderer = new GlobalRenderer(
    this._canvas.getContext('2d') as CanvasRenderingContext2D
  );
  private readonly _touchClickInputSystem = new TouchClickInputSystem();
  private readonly _coreEngine = new CoreEngine(
    this._touchClickInputSystem,
    this._globalRenderer
  );

  public Initialize() {
    this._coreEngine.onStop = () => {
      this._playButton.innerText = 'Play again';
    };
    this._playButton.addEventListener('click', () => {
      this._Play();
    });
  }

  private _Play() {
    if (this._coreEngine.GetEngineState().stores['game-state'] === 1) {
      this._coreEngine.Stop();
      this._playButton.innerText = 'Play again';
      return;
    }

    this._AddFundamentalObjects();
    this._AttachFundamentalScripts();
    this._coreEngine.Run();
    this._playButton.innerText = 'Stop';
  }

  private _AddFundamentalObjects() {
    const skyBox = new Rect({
      x: 0,
      y: 0,
      width: this._canvas.width,
      height: this._canvas.height,
      color: '#b0fbff',
    });
    const ground = new Rect({
      x: 0,
      y: GROUND_Y,
      width: this._canvas.width,
      height: this._canvas.height - GROUND_Y,
      color: '#2b1b0f',
    });
    const groundSurface = new Rect({
      x: 0,
      y: GROUND_Y,
      width: this._canvas.width,
      height: 5,
      color: '#379914',
    });
    const player = new Bird({
      x: WORLD_X_START + 100,
      y: 10,
      dy: 1,
      width: 10,
      height: 10,
      color: '#ff0000',
    });
    const score = new Score({});
    this._coreEngine.AddGameObjects([
      skyBox,
      ground,
      groundSurface,
      player,
      score,
    ]);
  }

  private _AttachFundamentalScripts() {
    const scoreScript = new ScoreScript();
    const birdCollisionScript = new BirdCollisionScript();
    const pipeSpawnerScript = new PipeSpawnerScript({
      spawnInterval: 60,
      pipePairConfig: {
        x: this._canvas.width,
        y: 0,
        dx: 3,
        gap: 70,
        color: '#ff6b6b',
      },
    });
    this._coreEngine.AttachScript(pipeSpawnerScript);
    this._coreEngine.AttachScript(scoreScript);
    this._coreEngine.AttachScript(birdCollisionScript);
  }
}
