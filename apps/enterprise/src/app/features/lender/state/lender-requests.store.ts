import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import {
    LenderQuotaRequest,
    LenderQuotaRequestListPaginationFilterPayload,
    LenderQuotaUpdateStatusPayload,
} from '@libera/models/lender-quota-request';
import {
    EntityListStore,
    EntityListStoreState,
    SubmitStoreState,
    UIState,
    StateWithUI,
} from '@mediomelon/ng-core';
import produce from 'immer';

export interface LenderQuotaRequestUIState extends UIState {
    updating: SubmitStoreState;
}

export interface LenderQuotaRequestWithUI
    extends StateWithUI<LenderQuotaRequest, LenderQuotaRequestUIState> {}

const initialState: EntityListStoreState<
    LenderQuotaRequest,
    LenderQuotaRequestUIState,
    LenderQuotaRequestListPaginationFilterPayload
> = {
    entities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
    pagination: {
        filters: {
            filter_by: null,
            q: null,
        },
        page: {
            index: 0,
            size: DEFAULT_PAGE_SIZE,
        },
        total: 0,
    },
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class LenderRequestsStore extends EntityListStore<
    LenderQuotaRequest,
    LenderQuotaRequestUIState,
    LenderQuotaRequestListPaginationFilterPayload
> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): LenderQuotaRequestUIState {
        return {
            error: null,
            loaded: false,
            loading: false,
            updating: {
                error: null,
                submitting: false,
            },
        };
    }

    updateQuotaRequestStatus(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id] || this.createInitialUIState();

            uiEntity.updating.submitting = true;
            uiEntity.updating.error = null;

            uiEntities[id] = uiEntity;
        });

        this.setState(newState);
    }

    updateQuotaRequestStatusSuccess(
        id: number,
        { status }: LenderQuotaUpdateStatusPayload
    ) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities, entities } = draft;
            const uiEntity = uiEntities[id];
            const entity = entities[id];

            entity.status = status;
            uiEntity.updating.submitting = false;
        });

        this.setState(newState);
    }

    updateQuotaRequestStatusError(id: number, error: any) {
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
