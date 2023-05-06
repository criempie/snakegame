export class Vector {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public static fromSimple(p: [number, number]) {
        return new Vector(p[0], p[1]);
    }

    public multiplyComponents(v: Vector) {
        this.x *= v.x;
        this.y *= v.y;

        return this;
    }

    public multiply(n: number) {
        this.x *= n;
        this.y *= n;

        return this;
    }

    public addition(n: number): Vector
    public addition(v: Vector): Vector
    public addition(nOrV: number | Vector) {
        if (typeof nOrV === 'number') {
            this.x += nOrV;
            this.y += nOrV;
        } else {
            this.x += nOrV.x;
            this.y += nOrV.y;
        }

        return this;
    }

    public isEqual(v: Vector) {
        return this.x === v.x && this.y === v.y;
    }

    public clone() {
        return new Vector(this.x, this.y);
    }

    public toSimple() {
        return [this.x, this.y];
    }
}