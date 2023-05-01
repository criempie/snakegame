import { Entity } from './entities';
import { Loop } from './loop';
import { CanvasRender } from './render';

export class Engine {
    private _renderer: CanvasRender;
    private _loop: Loop;
    private _entities: Entity[] = [];

    constructor(canvasElement: HTMLCanvasElement) {
        this._renderer = new CanvasRender(canvasElement);
        this._loop = new Loop(8, this._update.bind(this), this._render.bind(this));
    }

    public start() {
        this._loop.start();
    }

    private _update(dt: number) {

    }

    private _render() {
        this._renderer.render();
    }
}