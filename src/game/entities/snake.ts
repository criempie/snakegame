import { KeyboardKeyCode } from '~/engine/controlsManager';
import { Entity, EntityControls, StaticEntity, Vector } from '~/engine/entities';
import globalConfig from '~/game/config/global.config';
import snakeConfig from '~/game/config/snake.config';

class TailCell extends StaticEntity {
    constructor(pos: Vector) {
        super(pos.x, pos.y, globalConfig.cellSize, globalConfig.cellSize);
    }

    public update(newPos: Vector) {
        this._position = newPos.clone();
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = snakeConfig.tailColor;
        ctx.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
    }
}

export class Snake extends Entity {
    _controls: EntityControls = {
        [KeyboardKeyCode.W]: [() => this._direction = new Vector(0, -1)],
        [KeyboardKeyCode.S]: [() => this._direction = new Vector(0, 1)],
        [KeyboardKeyCode.A]: [() => this._direction = new Vector(-1, 0)],
        [KeyboardKeyCode.D]: [ () => this._direction = new Vector(1, 0)],
    }

    private _tail: TailCell[] = [];

    constructor(x: number, y: number) {
        super(x, y, globalConfig.cellSize, globalConfig.cellSize);

        this._direction = new Vector(1, 0);
        this._speed = globalConfig.cellSize;

        this._genTail(snakeConfig.initLength);
    }

    public update() {
        const prevHeadPosition = this._position.clone();

        this._position.addition(this._direction.clone().multiply(this._speed));

        const lastTailCell = this._tail.pop();
        if (lastTailCell) {
            lastTailCell.update(prevHeadPosition)
            this._tail.unshift(lastTailCell);
        }
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = snakeConfig.headColor;
        ctx.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);

        this._tail.forEach((t) => t.render(ctx));
    }

    private _genTail(length: number) {
        const tailDirection = this._direction.clone().multiply(-1);

        for (let i = 1; i <= length; i++) {
            const position = this._position.clone();
            position.addition(tailDirection.clone().multiplyComponents(this._size).multiply(i));

            const tailCell = new TailCell(position);

            this._tail.push(tailCell)
        }
    }
}