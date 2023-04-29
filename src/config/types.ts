export interface IGameConfig {
    cellSize: number;
    cellsInRow: number;
    cellsInColumn: number;
}

export interface IRenderConfig {
    emptyCellColor: string,
    berryColor: string,
    snakeHeadColor: string,
    snakeTailColor: string,
    backgroundColor: string,
}