import { IDrawable } from './types';

export class CanvasRender {
    private readonly _canvas: HTMLCanvasElement;
    private readonly _ctx: CanvasRenderingContext2D;
    private _buffer: IDrawable[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw Error('canvas context is undefined');

        this._ctx = ctx;
    }

    public render() {
        this._drawBackground();

        this._buffer.forEach((e) => e.render(this._ctx));
    }

    public add(element: IDrawable) {
        this._buffer.push(element);
    }

    private _drawBackground = this._drawWrapper(() => {
        this._ctx.fillStyle = '#444455';
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    });

    private _drawWrapper<T extends Array<unknown>, R>(func: (...args: T) => R) {
        return (...args: T): R => {
            const savedStrokeColor = this._ctx.strokeStyle;
            const savedFillColor = this._ctx.fillStyle;

            this._ctx.beginPath();
            const result = func.apply(this, args);
            this._ctx.closePath();

            this._ctx.strokeStyle = savedStrokeColor;
            this._ctx.fillStyle = savedFillColor;

            return result;
        };
    }
}