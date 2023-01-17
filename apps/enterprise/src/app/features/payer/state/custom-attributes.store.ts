import { Injectable } from '@angular/core';
import {
    EntityStore,
    UIState,
    SubmitStoreState,
    EntityStoreState,
    ID,
    StateWithUI,
} from '@mediomelon/ng-core';
import { LenderCustomAttribute } from '@libera/models/lender';
import produce from 'immer';

export interface CustomAttributeUIState extends UIState {
    delete: SubmitStoreState;
}

export type CustomAttributeWithUIEntity = StateWithUI<
    LenderCustomAttribute,
    CustomAttributeUIState
>;

type CustomAttributeStoreState = EntityStoreState<
    LenderCustomAttribute,
    CustomAttributeUIState
>;

const initialState: CustomAttributeStoreState = {
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
export class CustomAttributesStore extends EntityStore<
    LenderCustomAttribute,
    CustomAttributeUIState
> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): CustomAttributeUIState {
        return {
            error: null,
            loaded: false,
            loading: false,
            delete: {
                error: null,
                submitting: false,
            },
        };
    }

    delete(id: ID) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.delete.submitting = true;
            uiEntity.delete.error = null;
        });

        this.setState(newState);
    }

    deleteSuccess(id: ID) {
        this.remove(id);
    }

    deleteError(id: ID, error: any) {
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
