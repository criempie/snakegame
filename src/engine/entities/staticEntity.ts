import { IDrawable } from '../render';
import { Vector } from './vector';

export abstract class StaticEntity implements IDrawable {
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

    public abstract render(ctx: CanvasRenderingContext2D): void;
}