export class Loop {
    private _lastUpdate?: number;
    private _isStop: boolean = true;

    constructor(private _frequency: number, private _update: (dt: number) => void,
                private _render: () => void) {

        this._run = this._run.bind(this);
        this._run();
    }

    public start() {
        this._isStop = true;
    }

    public stop() {
        this._isStop = false;
    }

    private _run() {
        if (!this._isStop) return;

        const now = Date.now();

        const dt = now - (this._lastUpdate ?? 0);

        if (dt > 1000 / this._frequency) {
            this._lastUpdate = now;
            
            this._update(dt);
            this._render();
        }

        requestAnimationFrame(this._run);
    }
}