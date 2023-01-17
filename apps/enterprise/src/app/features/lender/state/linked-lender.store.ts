import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import {
    LenderOrderedListPaginationFilterPayload,
    LinkedLender,
} from '@libera/models/lender';
import {
    EntityListStore,
    EntityListStoreState,
    SubmitStoreState,
    UIState,
} from '@mediomelon/ng-core';
import produce from 'immer';

export interface LinkedLenderUI extends UIState {
    requesting: SubmitStoreState;
}

const initialState: EntityListStoreState<
    LinkedLender,
    LinkedLenderUI,
    LenderOrderedListPaginationFilterPayload
> = {
    entities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
    pagination: {
        filters: {
            filter_by: null,
            order_by: null,
            q: null,
        },
        page: {
            index: 0,
            size: DEFAULT_PAGE_SIZE,
        },
        total: null,
    },
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class LinkedLenderStore extends EntityListStore<
    LinkedLender,
    LinkedLenderUI,
    LenderOrderedListPaginationFilterPayload
> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): LinkedLenderUI {
        return {
            error: null,
            loaded: false,
            loading: false,
            requesting: {
                error: null,
                submitting: false,
            },
        };
    }

    requestQuotaAdjustment(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.requesting.submitting = true;
            uiEntity.requesting.error = null;
        });

        this.setState(newState);
    }

    requestQuotaAdjustmentSuccess(id:number){
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.requesting.submitting = false;
        });

        this.setState(newState);
    }

    requestQuotaAdjustmentError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.requesting.submitting = false;
            uiEntity.requesting.error = error;
        });

        this.setState(newState);
    }
}
