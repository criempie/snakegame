import { Level } from '~/engine/entities/level';
import { Berry } from '~/game/entities/berry';
import { Snake } from '~/game/entities/snake';

export class MyLevel extends Level<Snake | Berry>{
    constructor() {
        super();

        this._entities = [
            new Snake(128, 128),
            new Berry(16, 16),
        ];
    }
}