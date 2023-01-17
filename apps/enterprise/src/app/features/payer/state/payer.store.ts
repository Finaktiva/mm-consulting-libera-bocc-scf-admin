import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import {
    Payer,
    PayerListPaginationFilterPayload,
    PayerCustomAttribute,
} from '@libera/models/payer';
import {
    EntityListStore,
    EntityListStoreState,
    UIState,
    SubmitStoreState,
    ID,
} from '@mediomelon/ng-core';
import produce from 'immer';

export interface PayerAttributeUI extends UIState {
    delete: SubmitStoreState;
    updating: SubmitStoreState;
}

const initialState: EntityListStoreState<
    Payer,
    PayerAttributeUI,
    PayerListPaginationFilterPayload
> = {
    entities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
    pagination: {
        page: {
            index: 0,
            size: DEFAULT_PAGE_SIZE,
        },
        filters: {
            filter_by: null,
            q: null,
        },
        total: null,
    },
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class PayerStore extends EntityListStore<
    Payer,
    PayerAttributeUI,
    PayerListPaginationFilterPayload
> {
    constructor() {
        super(initialState, 'id');
    }

    createInitialUIState(): PayerAttributeUI {
        return {
            loaded: false,
            loading: false,
            error: null,
            delete: {
                submitting: false,
                error: null,
            },
            updating: {
                submitting: false,
                error: null,
            },
        };
    }

    deleteCustomAttribute(id: ID) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.delete.submitting = true;
            uiEntity.delete.error = null;
        });

        this.setState(newState);
    }

    deleteCustomAttributeSuccess(id: ID, attributeId: ID) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities, entities } = draft;
            const uiEntity = uiEntities[id];
            const entity = entities[id];

            const index = entity.customAttributes.findIndex(
                a => a.id == attributeId
            );
            let attribute = entity.customAttributes[index];

            if (attribute.type == 'CHECKBOX') {
                attribute.options.forEach(o => {
                    o.isChecked = false;
                });
            } else {
                attribute.value = '';
            }

            entity.customAttributes.splice(index, 1, attribute);
            uiEntity.delete.submitting = false;
        });

        this.setState(newState);
    }

    deleteCustomAttributeError(id: ID, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.delete.submitting = false;
            uiEntity.delete.error = error;
        });

        this.setState(newState);
    }

    updateCustomAttributes(id: ID) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.updating.submitting = true;
            uiEntity.updating.error = null;
        });

        this.setState(newState);
    }

    updateCustomAttributesSuccess(id: ID, payload: PayerCustomAttribute[]) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities, entities } = draft;
            const uiEntity = uiEntities[id];
            const entity = entities[id];

            uiEntity.updating.submitting = false;
            entity.customAttributes = payload;
        });

        this.setState(newState);
    }

    updateCustomAttributesError(id: ID, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.updating.submitting = false;
            uiEntity.updating.error = error;
        });

        this.setState(newState);
    }
}
