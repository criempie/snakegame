import { Entity } from '../../engine/entities';
import { IDrawable } from '../../engine/render';

export class Cell extends Entity implements IDrawable {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
    }
}