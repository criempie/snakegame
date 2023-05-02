import { KeyboardKeyCode } from '../../engine/controls';
import { EntityControls } from '../../engine/entities/entity';
import { Vector } from '../../engine/entities';
import { Entity } from '../../engine/entities';

export class Cell extends Entity {
    _controls: EntityControls = {
        [KeyboardKeyCode.S]:  this._moveDown.bind(this),
    }

    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
    }

    public kick() {
        this._speed = 1;
        this._direction = new Vector(0, 1);
    }

    private _moveDown() {
        this._speed = 1;
        this._direction = new Vector(0, 1);
    }

    public afterUpdate() {
        this._speed = Math.max(0, this._speed - 0.1);
    }
}