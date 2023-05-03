import { Level } from '~/engine/entities/level';
import { MyLevel } from '~/game/entities/level';
import { Game } from '../engine';

export class MyGame extends Game {
    protected _level: Level;

    constructor(rootElement: HTMLElement) {
        super(rootElement, { ups: 8 });

        this._level = new MyLevel();
    }
}