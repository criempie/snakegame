import { Vector } from '~/engine/entities';
import { Level } from '~/engine/entities/level';
import globalConfig from '~/game/config/global.config';
import { Berry } from '~/game/entities/berry';
import { Snake } from '~/game/entities/snake';
import { RandomGenerator } from '~/game/randomGenerator';

export class MyLevel extends Level<Snake | Berry> {
    private _snake: Snake;
    private _berry: Berry;
    private _randGenerator: RandomGenerator;

    constructor(private _gameOverFn: Function) {
        super();

        this._snake = new Snake(2, 2, this._gameOver.bind(this));
        this._berry = new Berry(0, 0);

        this._entities = [
            this._snake,
            this._berry,
        ];

        this._randGenerator = new RandomGenerator(globalConfig.cellsInRow, globalConfig.cellsInColumn);
    }

    public update() {
        if (this._checkBerryPickup()) {
            this._berryPickup();
        }

        super.update();
        this._bordersCollision();
    }

    private _bordersCollision() {
        const left = this._snake.position.x >= 0;
        const right = this._snake.position.x <= globalConfig.cellsInRow;
        const up = this._snake.position.y >= 0;
        const down = this._snake.position.y <= globalConfig.cellsInColumn;

        if (!left) {
            const offset = new Vector(globalConfig.cellsInRow, 0);
            this._snake.position = this._snake.position.addition(offset);
        } else if (!right) {
            const offset = new Vector(globalConfig.cellsInRow, 0);
            this._snake.position = this._snake.position.addition(offset.multiply(-1));
        } else if (!up) {
            const offset = new Vector(0, globalConfig.cellsInColumn);
            this._snake.position = this._snake.position.addition(offset);
        } else if (!down) {
            const offset = new Vector(0, globalConfig.cellsInColumn);
            this._snake.position = this._snake.position.addition(offset.multiply(-1));
        }
    }

    private _gameOver() {
        this._gameOverFn();
    }

    private _berryPickup() {
        this._snake.increaseTail();
        this._berryRelocate();
    }

    private _berryRelocate() {
        const newPosition = this._randGenerator.getRandomEmptyCell(this._snake.getSimpleCoords());

        this._berry.setNewPosition(Vector.fromSimple(newPosition));
    }

    private _checkBerryPickup() {
        return this._snake.position.isEqual(this._berry.position);
    }
}