import { Injectable } from '@angular/core';
import { EnterpriseCustomAttribute } from '@libera/models/enterprise';
import { EntityStore, EntityStoreState, SubmitStoreState, UIState } from '@mediomelon/ng-core';
import produce from 'immer';

export interface CustomAttributeUI extends UIState {
    delete: SubmitStoreState;
}

const initialState: EntityStoreState<
    EnterpriseCustomAttribute,
    CustomAttributeUI
> = {
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
export class CustomAttributeStore extends EntityStore<
EnterpriseCustomAttribute,
CustomAttributeUI
> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): CustomAttributeUI {
        return {
            loaded: false,
            loading: false,
            error: null,
            delete: {
                submitting: false,
                error: null,
            },
        };
    }

    delete(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.delete.submitting = true;
            uiEntity.delete.error = null;
        });

        this.setState(newState);
    }

    deleteSuccess(removeId: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities, entities, ids } = draft;
            delete entities[removeId];
            delete uiEntities[removeId];
            draft.ids = ids.filter(id => id != removeId);
        });

        this.setState(newState);
    }

    deleteError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.delete.submitting = false;
            uiEntity.delete.error = payload;
        });

        this.setState(newState);
    }
}
