export class Loop {
    private _lastUpdate?: number;

    constructor(private _frequency: number, private _update: (dt: number) => void,
                private _render: () => void) {
        this.start = this.start.bind(this);
    }

    public start() {
        const now = Date.now();

        const dt = now - (this._lastUpdate ?? 0);

        if (dt > 1000 / this._frequency) {
            this._lastUpdate = now;
            
            this._update(dt);
            this._render();
        }

        requestAnimationFrame(this.start);
    }
}