export class Vector {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public multiply(n: number) {
        this.x *= n;
        this.y *= n;

        return this;
    }

    public addition(v: Vector) {
        this.x += v.x;
        this.y += v.y;

        return this;
    }

    public clone() {
        return new Vector(this.x, this.y);
    }
}