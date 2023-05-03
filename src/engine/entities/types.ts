import { KeyboardKeyCode } from '~/engine/controlsManager';

export interface IUpdatable {
    update: (dt?: number) => void;
}

export interface IRenderable {
    render: (ctx: CanvasRenderingContext2D) => void;
}

export type EntityControls = { [key in KeyboardKeyCode]?: Function[] };