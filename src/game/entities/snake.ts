import { KeyboardKeyCode } from '~/engine/controlsManager';
import { Entity, EntityControls, StaticEntity, Vector } from '~/engine/entities';
import globalConfig from '~/game/config/global.config';
import snakeConfig from '~/game/config/snake.config';
import { relativeToAbsolute } from '~/game/lib';

class TailCell extends StaticEntity {
    constructor(pos: Vector) {
        super(pos.x, pos.y, globalConfig.cellSize, globalConfig.cellSize);
    }

    public update(newPos: Vector) {
        this._position = newPos.clone();
    }

    public render(ctx: CanvasRenderingContext2D) {
        const absPos = relativeToAbsolute(this._position);

        ctx.fillStyle = snakeConfig.tailColor;
        ctx.fillRect(absPos.x, absPos.y, this._size.x, this._size.y);
    }
}

export class Snake extends Entity {
    _controls: EntityControls = {
        [KeyboardKeyCode.W]: [ () => this._changeDirection('up') ],
        [KeyboardKeyCode.S]: [ () => this._changeDirection('down') ],
        [KeyboardKeyCode.A]: [ () => this._changeDirection('left') ],
        [KeyboardKeyCode.D]: [ () => this._changeDirection('right') ],
    };

    private _tail: TailCell[] = [];

    private get _absolutePosition() {
        return relativeToAbsolute(this._position);
    }

    constructor(x: number, y: number, public onDeath?: Function) {
        super(x, y, globalConfig.cellSize, globalConfig.cellSize);

        this._direction = new Vector(1, 0);
        this._speed = 1;

        this._genTail(snakeConfig.initLength);
    }

    public update() {
        const prevHeadPosition = this._position.clone();

        this._position.addition(this._direction.clone().multiply(this._speed));

        const lastTailCell = this._tail.pop();
        if (lastTailCell) {
            lastTailCell.update(prevHeadPosition);
            this._tail.unshift(lastTailCell);
        }

        if (this._checkCollision()) {
            if (this.onDeath) this.onDeath();
        }
    }

    public render(ctx: CanvasRenderingContext2D): void {
        const absPos = this._absolutePosition;

        ctx.fillStyle = snakeConfig.headColor;
        ctx.fillRect(absPos.x, absPos.y, this._size.x, this._size.y);

        this._tail.forEach((t) => t.render(ctx));
    }

    public increaseTail() {
        this._tail.push(...this._createTailContinuation(1));
    }

    public getSimpleCoords() {
        const result: [ number, number ][] = [];

        result.push([ this._position.x, this._position.y ]);
        this._tail.forEach((t) => result.push([ t.position.x, t.position.y ]));

        return result;
    }

    private _changeDirection(newDir: 'up' | 'down' | 'right' | 'left') {
        switch (newDir) {
            case 'up': {
                const up = new Vector(0, -1);
                if (!this._direction.clone().multiply(-1).isEqual(up)) {
                    this._direction = up;
                }
                break;
            }
            case 'down': {
                const down = new Vector(0, 1);
                if (!this._direction.clone().multiply(-1).isEqual(down)) {
                    this._direction = down;
                }
                break;
            }
            case 'left': {
                const left = new Vector(-1, 0);
                if (!this._direction.clone().multiply(-1).isEqual(left)) {
                    this._direction = left;
                }
                break;
            }
            case 'right': {
                const right = new Vector(1, 0);
                if (!this._direction.clone().multiply(-1).isEqual(right)) {
                    this._direction = right;
                }
                break;
            }
        }
    }

    private _genTail(length: number) {
        this._tail.push(...this._createTailContinuation(length));
    }

    private _checkCollision() {
        return this._tail.reduce((acc, t) => acc || t.position.isEqual(this._position), false);
    }

    private _createTailContinuation(n: number) {
        const tailDirection = this._direction.clone().multiply(-1);
        const result = [];
        const position = this._tail[this._tail.length - 1]?.position.clone() ?? this._position.clone();
        for (let i = 1; i <= n; i++) {
            position.addition(tailDirection.clone().multiply(this._speed).multiply(i));

            const tailCell = new TailCell(position);

            result.push(tailCell);
        }

        return result;
    }
}