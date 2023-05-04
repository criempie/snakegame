import { Vector } from '~/engine/entities';
import globalConfig from '~/game/config/global.config';

function relativeToAbsolute(n: number): number
function relativeToAbsolute(x: number, y: number): Vector
function relativeToAbsolute(vector: Vector): Vector

function relativeToAbsolute(vectorOrNumber: number | Vector, y?: number) {
    if (typeof vectorOrNumber === 'number') {
        if (y) {
            return new Vector(_absCoord(vectorOrNumber), _absCoord(y));
        } else {
            return _absCoord(vectorOrNumber);
        }
    } else {
        return vectorOrNumber.clone()
                             .multiply(globalConfig.cellSize)
                             .addition(globalConfig.canvasPadding);
    }
}

function _absCoord(n: number) {
    return n * globalConfig.cellSize + globalConfig.canvasPadding;
}

export { relativeToAbsolute };