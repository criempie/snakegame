import { Controls } from './controls';
import { Entity, StaticEntity } from './entities';
import { Loop } from './loop';
import { CanvasRender } from './render';

export class Engine {
    private _renderer: CanvasRender;
    private _loop: Loop;
    private _entities: (Entity | StaticEntity)[] = [];
    private _controls: Controls;

    constructor(canvasElement: HTMLCanvasElement) {
        this._renderer = new CanvasRender(canvasElement);
        this._loop = new Loop(30, this._update.bind(this), this._render.bind(this));
        this._controls = new Controls(canvasElement);
    }

    public start() {
        this._loop.start();
        this._controls.init();
    }

    public addEntity(entity: Entity | StaticEntity) {
        this._entities.push(entity);
        this._renderer.add(entity);

        if (entity instanceof Entity) {
            this._controls.registerEntityControls(entity);
        }
    }

    private _update(dt: number) {
        this._entities.forEach((e) => {
            if (e instanceof Entity) {
                e.update();
                e.afterUpdate && e.afterUpdate();
            }
        });
    }

    private _render() {
        this._renderer.render();
    }
}