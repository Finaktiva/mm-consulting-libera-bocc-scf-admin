import { Injectable } from '@angular/core';
import { PayerCustomAttribute } from '@libera/models/payer';
import { StateWithUI } from '@libera/models/ui';
import {
    EntityStore,
    EntityStoreState,
    SubmitStoreState,
    UIState,
} from '@mediomelon/ng-core';
import produce from 'immer';

export interface PayerCustomAttributeUIState extends UIState {
    delete: SubmitStoreState;
    update: SubmitStoreState;
}
export type PayerCustomAttributeWithUIEntity = StateWithUI<
    PayerCustomAttribute,
    PayerCustomAttributeUIState
>;

type PayerCustomAttributeStoreState = EntityStoreState<
    PayerCustomAttribute,
    PayerCustomAttributeUIState
>;
const initialState: PayerCustomAttributeStoreState = {
    entities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,

    uiEntities: {},
};
@Injectable({
    providedIn: 'root',
})
export class PayerCustomAttributesStore extends EntityStore<
    PayerCustomAttribute,
    PayerCustomAttributeUIState
> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): PayerCustomAttributeUIState {
        return {
            error: null,
            loaded: false,
            loading: false,
            delete: {
                error: null,
                submitting: false,
            },
            update: {
                submitting: false,
                error: null,
            },
        };
    }
    update(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.uiEntities[id];

            if (!entity) return;

            entity.update.submitting = true;
            entity.update.error = null;
        });

        this.setState(newState);
    }

    updateSuccess(id: number, payload: PayerCustomAttribute[]) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            uiEntity.update.submitting = false;
            entities[id] = {
                ...entity,
                ...payload,
            };
        });

        this.setState(newState);
    }
    updateError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.update.submitting = false;
            uiEntity.update.error = error;
        });

        this.setState(newState);
    }

    delete(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id] || this.createInitialUIState();

            uiEntity.delete.submitting = true;
            uiEntity.delete.error = null;
        });

        this.setState(newState);
    }

    deleteSuccess(id: number) {
        this.remove(id);
    }

    deleteError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.delete.submitting = false;
            uiEntity.delete.error = error;
        });

        this.setState(newState);
    }
}
