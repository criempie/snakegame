import { Vector } from '~/engine/entities';
import { Level } from '~/engine/entities/level';
import globalConfig from '~/game/config/global.config';
import { MyLevel } from '~/game/entities/level';
import { gameOverPopup } from '~/game/gui/html/game-over-popup';
import { relativeToAbsolute } from '~/game/lib';
import { Game } from '../engine';

export class MyGame extends Game {
    protected _level: Level;

    constructor(private _rootElement: HTMLElement) {
        super(_rootElement, {
            ups: 12,
            canvasSize: new Vector(
                relativeToAbsolute(globalConfig.cellsInRow) + globalConfig.canvasPadding,
                relativeToAbsolute(globalConfig.cellsInColumn) + globalConfig.canvasPadding
            )
        });

        this._level = new MyLevel(this.gameOver.bind(this));
    }

    public gameOver() {
        this._engine.stop();
        const canvas = this._rootElement.getElementsByClassName('canvas')[0];

        if (canvas) {
            canvas.appendChild(gameOverPopup('game over!'));
        }
    }
}