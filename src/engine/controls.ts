import { Entity } from './entities';

export enum KeyboardKeyCode {
    W = 'KeyW', A = 'KeyA', S = 'KeyS', D = 'KeyD', SPACE = 'Space'
}

export class Controls {
    private _callbacks: Map<KeyboardKeyCode | string, Function[]> = new Map();

    constructor(private _elementToObserve: HTMLElement) {
        Object.values(KeyboardKeyCode)
              .forEach((k) => this._callbacks.set(k, []));
    }

    public init() {
        this._elementToObserve.addEventListener('keypress', this._listener.bind(this));
    }

    public registerEntityControls(entity: Entity) {
        Object.entries(entity.controls)
              .forEach(([ key, fn ]) => {
                  this._callbacks.get(key)?.push(fn);
              });
    }

    public register(keyCode: KeyboardKeyCode, callback: Function) {
        this._callbacks.get(keyCode)?.push(callback);
    }

    private _listener(event: KeyboardEvent) {
        const keyCode = event.code;
        const callbacks = this._callbacks.get(keyCode);

        console.log(event);

        if (callbacks) {
            callbacks.forEach((c) => c());
        }
    }
}