import { getRandomInt } from '~/game/lib';

export class RandomGenerator {
    private _clearField: [ number, number ][];

    constructor(width: number, height: number,) {
        this._clearField = this._genClearField(width, height);
    }

    public getRandomEmptyCell(exclude: [number, number][]) {
        const _field = JSON.parse(JSON.stringify(this._clearField));

        this._findAndDelete(_field, exclude.slice());

        return _field[getRandomInt(0, _field.length)];
    }

    private _findAndDelete(from: [ number, number ][], v: [ number, number ][]) {
        for (let i = from.length - 1; i >= 0; i--) {
            if (v.reduce((acc, value) => (acc || this._compareCoords(from[i], value)), false)) {
                from.splice(i, 1);
            }
        }
    }

    private _compareCoords(arr1: [ number, number ], arr2: [ number, number ]) {
        return arr1[0] === arr2[0] && arr1[1] === arr2[1];
    }

    private _genClearField(width: number, height: number) {
        const result: [ number, number ][] = [];

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                result.push([ i, j ]);
            }
        }

        return result;
    }
}