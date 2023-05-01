import { Engine } from './engine';

export class Game {
    protected _engine: Engine;

    constructor(rootElement: HTMLElement) {
        const canvasElement = document.createElement('canvas');
        rootElement.appendChild(canvasElement);

        this._engine = new Engine(canvasElement);
    }

    public init() {}

    public start() {
        this.init();

        this._engine.start();
    }
}