import { Vector } from '~/engine/entities';
import { Level } from '~/engine/entities/level';
import globalConfig from '~/game/config/global.config';
import { MyLevel } from '~/game/entities/level';
import { relativeToAbsolute } from '~/game/lib';
import { Game } from '../engine';

export class MyGame extends Game {
    protected _level: Level;

    constructor(rootElement: HTMLElement) {
        super(rootElement, {
            ups: 12,
            canvasSize: new Vector(
                relativeToAbsolute(globalConfig.cellsInRow) + globalConfig.canvasPadding,
                relativeToAbsolute(globalConfig.cellsInColumn) + globalConfig.canvasPadding
            )
        });

        this._level = new MyLevel();
    }
}