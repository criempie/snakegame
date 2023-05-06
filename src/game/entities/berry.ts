import { StaticEntity, Vector } from '~/engine/entities';
import globalConfig from '~/game/config/global.config';
import { relativeToAbsolute } from '~/game/lib';

export class Berry extends StaticEntity {
    private readonly _naturalOffset: number;

    private get _absolutePosition() {
        return relativeToAbsolute(this._position);
    }

    constructor(x: number, y: number) {
        const absPos = relativeToAbsolute(x, y);

        const naturalOffset = globalConfig.cellSize * 0.2;
        const size = globalConfig.cellSize - naturalOffset * 2;

        super(absPos.x, absPos.y, size, size);
        this._naturalOffset = naturalOffset;

    }

    public setNewPosition(newPos: Vector) {
        this._position = newPos.clone();
    }

    public render(ctx: CanvasRenderingContext2D) {
        const absPos = this._absolutePosition;

        ctx.fillStyle = globalConfig.berryColor;
        ctx.fillRect(absPos.x + this._naturalOffset, absPos.y + this._naturalOffset, this._size.x, this._size.y);
    }
}