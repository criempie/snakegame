import gameConfig from '../config';
import renderConfig from '../config/render';

class Canvas {
    public element: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor(public padding: number = 0) {
        this.element = document.createElement('canvas');

        this.element.width = gameConfig.cellSize * gameConfig.cellsInRow + this.padding * 2;
        this.element.height = gameConfig.cellSize * gameConfig.cellsInColumn + this.padding * 2;

        this.element.className = 'canvas';

        this._ctx = this.element.getContext('2d')!;
    }

    public drawCells() {
        const naturalOffset = gameConfig.cellSize / 2;

        for (let i = 0; i < gameConfig.cellsInRow; i++) {
            for (let j = 0; j < gameConfig.cellsInColumn; j++) {
                const [ x, y ] = [
                    this.padding + naturalOffset + i * gameConfig.cellSize,
                    this.padding + naturalOffset + j * gameConfig.cellSize
                ];

                this._drawCell(x, y);
            }
        }
    }

    public clear() {
        this._ctx.clearRect(0, 0, this.element.width, this.element.height);
    }

    private _drawCell(x: number, y: number) {
        this._ctx.beginPath();
        this._ctx.fillStyle = renderConfig.emptyCellColor;
        this._ctx.arc(x, y, gameConfig.cellSize / 4, 0, Math.PI * 2, false);
        this._ctx.fill();
    }
}

export default Canvas;