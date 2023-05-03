import { Level } from '~/engine/entities/level';
import { ControlsManager } from './controlsManager';
import { Loop } from './loop';
import { CanvasRender } from './render';

export class Engine {
    private _renderer: CanvasRender;
    private _loop: Loop;
    private _controlsManager: ControlsManager;

    private _functionsToUpdate: Function[] = [];

    constructor(canvasElement: HTMLCanvasElement, ups: number) {
        this._renderer = new CanvasRender(canvasElement);
        this._loop = new Loop(ups, this._update.bind(this), this._render.bind(this));
        this._controlsManager = new ControlsManager(canvasElement);
    }

    public start() {
        this._loop.start();
        this._controlsManager.init();
    }

    public processLevel(lvl: Level) {
        this._functionsToUpdate.push(lvl.update);
        this._renderer.add(lvl);
        this._controlsManager.registerControls(lvl.controls);
    }

    private _update(dt: number) {
        this._functionsToUpdate.forEach((fn) => fn());
    }

    private _render() {
        this._renderer.render();
    }
}