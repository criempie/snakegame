import { Vector } from '~/engine/entities';
import { Level } from '~/engine/entities/level';
import { Engine } from './engine';

export interface GameSettings {
    ups?: number,
    canvasSize?: Vector
}

export abstract class Game {
    protected _engine: Engine;
    protected abstract _level: Level;

    protected constructor(rootElement: HTMLElement, settings: GameSettings) {
        const canvasElement = this._setupCanvas(rootElement, settings);

        this._engine = new Engine(canvasElement, settings.ups ?? 15);
    }

    public start() {
        this._level.init();
        this._engine.processLevel(this._level);
        this._engine.start();
    }

    private _setupCanvas(rootElement: HTMLElement, settings: GameSettings) {
        const canvasElement = document.createElement('canvas');

        canvasElement.tabIndex = 0;
        canvasElement.width = settings.canvasSize?.x ?? 800;
        canvasElement.height = settings.canvasSize?.y ?? 600;
        rootElement.appendChild(canvasElement);

        return canvasElement;
    }
}