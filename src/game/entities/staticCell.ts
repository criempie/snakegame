import { StaticEntity } from '../../engine/entities';

export class StaticCell extends StaticEntity {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'red';
        ctx.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
    }
}