import gameConfig from '../config';
import renderConfig from '../config/render';
import { Vector } from '../types';

class Canvas {
    public element: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    public static toAbsoluteVector(vec: Vector) {
        return {
            x: vec.x * gameConfig.cellSize,
            y: vec.y * gameConfig.cellSize
        };
    }

    constructor(public padding: number = 0) {
        this.element = document.createElement('canvas');

        this.element.width = gameConfig.cellSize * gameConfig.cellsInRow + this.padding * 2;
        this.element.height = gameConfig.cellSize * gameConfig.cellsInColumn + this.padding * 2;

        this.element.className = 'canvas';

        this._ctx = this.element.getContext('2d')!;
    }

    public drawSnake(parts: Vector[]) {
        parts.forEach((part, index) => this._drawSnakePart(part, index === 0));
    }

    public drawCells() {
        const naturalOffset = gameConfig.cellSize / 2;

        for (let i = 0; i < gameConfig.cellsInRow; i++) {
            for (let j = 0; j < gameConfig.cellsInColumn; j++) {
                const [ x, y ] = [
                    this.padding + naturalOffset + i * gameConfig.cellSize,
                    this.padding + naturalOffset + j * gameConfig.cellSize
                ];

                this._drawFieldCell(x, y);
            }
        }
    }

    public clear() {
        this._ctx.clearRect(0, 0, this.element.width, this.element.height);
    }

    private _drawFieldCell(x: number, y: number) {
        const prevFillStyle = this._ctx.fillStyle;

        this._ctx.beginPath();
        this._ctx.fillStyle = renderConfig.emptyCellColor;
        this._ctx.arc(x, y, gameConfig.cellSize / 4, 0, Math.PI * 2, false);
        this._ctx.fill();

        this._ctx.fillStyle = prevFillStyle;
    }

    private _drawSnakePart(part: Vector, isHead: boolean = false) {
        const { x, y } = Canvas.toAbsoluteVector(part);
        const prevFillStyle = this._ctx.fillStyle;

        this._ctx.fillStyle = isHead ? renderConfig.snakeHeadColor : renderConfig.snakeTailColor;

        this._ctx.beginPath();
        this._ctx.fillRect(x - gameConfig.cellSize / 4, y - gameConfig.cellSize / 4, gameConfig.cellSize, gameConfig.cellSize);

        this._ctx.fillStyle = prevFillStyle;
    }
}

export default Canvas;