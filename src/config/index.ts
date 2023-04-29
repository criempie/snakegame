import { IGameConfig, IRenderConfig } from './types';

const gameConfig: IGameConfig = {
    cellSize: 16,
    cellsInRow: 25,
    cellsInColumn: 25,
};

export default gameConfig;
export type { IGameConfig, IRenderConfig };