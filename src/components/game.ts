import Canvas from './canvas';

class Game {
    private _canvas: Canvas;

    constructor(private _rootElement: HTMLElement) {
        this._canvas = new Canvas(12);
    }

    public render() {
        this._rootElement.appendChild(this._canvas.element);
        this._canvas.drawCells();
    }
}

export default Game;