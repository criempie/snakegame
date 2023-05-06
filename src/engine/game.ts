import { Vector } from '~/engine/entities';
import { Level } from '~/engine/entities/level';
import { canvas } from '~/game/gui/html/canvas';
import { Engine } from './engine';

export interface GameSettings {
    ups?: number,
    canvasSize?: Vector
}

export abstract class Game {
    protected _engine: Engine;
    protected abstract _level: Level;

    protected constructor(rootElement: HTMLElement, settings: GameSettings) {
        const canvasContainer = canvas([settings.canvasSize?.x ?? 800, settings.canvasSize?.y ?? 600]);
        rootElement.appendChild(canvasContainer);

        const canvasElement = canvasContainer.getElementsByClassName('canvas__element')[0] as HTMLCanvasElement

        if (!canvasElement) throw Error('cannot find canvas element');

        this._engine = new Engine(canvasElement, settings.ups ?? 15);
    }

    public start() {
        this._level.init();
        this._engine.processLevel(this._level);
        this._engine.start();
    }
}