import { Vector } from './vector';

export class Entity {
    protected _position: Vector;
    protected _size: Vector;

    public get position() {
        return this._position.clone();
    }

    public get size() {
        return this._size.clone();
    }

    constructor(x: number, y: number, w: number, h: number) {
        this._position = new Vector(x, y);
        this._size = new Vector(w, h);
    }
}