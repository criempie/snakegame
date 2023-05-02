import { Game } from '../engine';
import { Cell } from './entities/cell';
import { StaticCell } from './entities/staticCell';

export class MyGame extends Game {
    constructor(rootElement: HTMLElement) {
        super(rootElement);
    }

    public init() {
        const cell = new Cell(12, 12, 12, 12);
        const staticCell = new StaticCell(12, 64, 12, 12);

        this._engine.addEntity(cell);
        this._engine.addEntity(staticCell);

        cell.kick();
    }
}