export class Vector {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public multiply(n: number) {
        this.x *= n;
        this.y *= n;

        return this;
    }

    public clone() {
        return new Vector(this.x, this.y);
    }
}