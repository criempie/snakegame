import { EntityControls } from './entities';

export enum KeyboardKeyCode {
    W = 'KeyW', A = 'KeyA', S = 'KeyS', D = 'KeyD', SPACE = 'Space'
}

export class ControlsManager {
    private _callbacks: Map<KeyboardKeyCode | string, Function[]> = new Map();

    constructor(private _elementToObserve: HTMLElement) {
        Object.values(KeyboardKeyCode)
              .forEach((k) => this._callbacks.set(k, []));
    }

    public start() {
        this._elementToObserve.addEventListener('keypress', this._listener.bind(this));
    }

    public stop() {
        this._elementToObserve.removeEventListener('keypress', this._listener.bind(this));
    }

    public registerControls(controls: EntityControls) {
        Object.entries(controls)
              .forEach(([ key, fns ]) => {
                  this._callbacks.get(key)?.push(...fns);
              });
    }

    public register(keyCode: KeyboardKeyCode, callback: Function) {
        this._callbacks.get(keyCode)?.push(callback);
    }

    private _listener(event: KeyboardEvent) {
        const keyCode = event.code;
        const callbacks = this._callbacks.get(keyCode);

        if (callbacks) {
            callbacks.forEach((c) => c());
        }
    }
}