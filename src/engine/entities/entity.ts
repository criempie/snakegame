import { KeyboardKeyCode } from '../controls';
import { StaticEntity } from './staticEntity';
import { Vector } from './vector';

export interface Entity {
    afterUpdate?(): void;
}

export type EntityControls = { [key in KeyboardKeyCode]?: Function };

export abstract class Entity extends StaticEntity {
    protected _direction: Vector;
    protected _speed: number;
    protected _controls: EntityControls = {};

    public get controls() {
        return Object.assign({}, this._controls);
    }

    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);

        this._direction = new Vector();
        this._speed = 0;
    }

    public update() {
        this._position.addition(this._direction.clone().multiply(this._speed));
    }
}