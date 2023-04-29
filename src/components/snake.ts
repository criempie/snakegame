import { Vector } from '../types';

class Snake {
    // Координаты относительно клеток поля
    public body: Vector[] = [];
    public direction: Vector;

    constructor(position: Vector, tailLength: number = 2, direction: Vector = { x: 0, y: -1 }) {
        this.body = [ position, ...Snake._generateTail(tailLength, direction)
                                        .map((part) => ({ x: part.x + position.x, y: part.y + position.y })) ];

        this.direction = { x: -direction.x, y: -direction.y };
    }

    public move() {
        this.body.pop();
        this.body.unshift({ x: this.body[0].x + this.direction.x, y: this.body[0].y + this.direction.y });
    }

    private static _generateTail(length: number, direction: Vector) {
        const tail = [];
        for (let i = 1; i <= length; i++) {
            tail.push({ x: i * direction.x, y: i * direction.y });
        }

        return tail;
    }
}

export default Snake;