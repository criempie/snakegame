import { StaticEntity } from '~/engine/entities';
import globalConfig from '~/game/config/global.config';

export class Berry extends StaticEntity {
    private readonly _padding: number;

    constructor(x: number, y: number) {
        const padding = Math.floor(globalConfig.cellSize / 4);
        const size = globalConfig.cellSize - padding / 2;

        super(x, y, size, size);
        this._padding = padding;

    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = globalConfig.berryColor;
        ctx.fillRect(this._position.x + this._padding, this._position.y + this._padding, this._size.x, this._size.y);
    }
}