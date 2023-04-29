import gameConfig from '../config';
import Canvas from './canvas';
import Snake from './snake';

class Game {
    private _minTimeBetweenUpdates = 1000 / gameConfig.fps;

    private _canvas: Canvas;
    private _snake: Snake;
    private _lastLoopUpdate?: number;

    constructor(private _rootElement: HTMLElement) {
        this._canvas = new Canvas(12);
        this._snake = new Snake({ x: 12, y: 12 });

        this._rootElement.appendChild(this._canvas.element);
    }

    public start() {
        this._render();
        requestAnimationFrame(this._loop.bind(this));
    }

    private _render() {
        this._canvas.clear();
        this._canvas.drawCells();
        this._canvas.drawSnake(this._snake.body);
    }

    private _loop(timestamp: number) {
        if (timestamp - (this._lastLoopUpdate ?? 0) > this._minTimeBetweenUpdates) {
            this._lastLoopUpdate = timestamp;

            this._update();
            this._render();
        }

        requestAnimationFrame(this._loop.bind(this));
    }

    private _update() {
        this._snake.move();
    }
}

export default Game;