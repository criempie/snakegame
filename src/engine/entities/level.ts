import { KeyboardKeyCode } from '~/engine/controlsManager';
import { Entity } from '~/engine/entities/entity';
import { StaticEntity } from '~/engine/entities/staticEntity';
import { EntityControls, IRenderable, IUpdatable } from '~/engine/entities/types';

type EntitiesUnion = Entity | StaticEntity;

export abstract class Level<Entities extends EntitiesUnion = EntitiesUnion> implements IRenderable, IUpdatable {
    protected _entities: Entities[] = [];
    public controls: EntityControls = {};

    protected constructor() {
        this.update = this.update.bind(this);
    }

    public init() {
        this.controls = this._mergeControlsOfEntities();
    }

    public update() {
        this._updateEntities();
    }

    public render(ctx: CanvasRenderingContext2D) {
        this._renderEntities(ctx);
    }

    private _updateEntities() {
        this._entities.forEach((e) => {
            if (e instanceof Entity) {
                e.update();
            }
        });
    }

    private _renderEntities(ctx: CanvasRenderingContext2D) {
        this._entities.forEach((e) => {
            e.render(ctx);
        });
    }

    private _mergeControlsOfEntities() {
        return this._entities.reduce((acc, ent) => {
            if (ent instanceof Entity) {
                Object.entries(ent.controls)
                      .forEach(([ _key, fns ]) => {
                          const key = _key as KeyboardKeyCode;
                          if (!acc[key]) acc[key] = [];

                          // @ts-ignore
                          acc[key].push(...fns);
                      });
            }

            return acc;
        }, {} as EntityControls);
    }
}