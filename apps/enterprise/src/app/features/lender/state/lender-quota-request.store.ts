import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import {
    LenderQuotaRequest,
    LenderQuotaRequestListPaginationFilterPayload,
    LenderQuotaRequestPayload,
    LENDER_QUOTA_REQUEST_TYPE,
    LENDER_QUOTA_REQUEST_STATUS,
} from '@libera/models/lender-quota-request';
import {
    EntityListStore,
    EntityListStoreState,
    SubmitStoreState,
    UIState,
} from '@mediomelon/ng-core';
import produce from 'immer';

export interface LenderQuotaRequestUI extends UIState {
    expanded: boolean;
    reject: SubmitStoreState;
    approve: SubmitStoreState;
    update: SubmitStoreState;
    quotaRequest: SubmitStoreState;
}

const initialState: EntityListStoreState<
    LenderQuotaRequest,
    LenderQuotaRequestUI,
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
        total: null,
    },
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class LenderQuotaRequestStore extends EntityListStore<
    LenderQuotaRequest,
    LenderQuotaRequestUI,
    LenderQuotaRequestListPaginationFilterPayload
> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): LenderQuotaRequestUI {
        return {
            error: null,
            expanded: false,
            loaded: false,
            loading: false,
            approve: {
                error: null,
                submitting: false,
            },
            reject: {
                error: null,
                submitting: false,
            },
            update: {
                error: null,
                submitting: false,
            },
            quotaRequest: {
                error: null,
                submitting: false,
            },
        };
    }

    toggle(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.expanded = !uiEntity.expanded;
        });

        this.setState(newState);
    }

    update(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.update.submitting = true;
            uiEntity.update.error = null;
        });

        this.setState(newState);
    }

    updateSuccess(id: number, payload: LenderQuotaRequestPayload) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const uiEntity = uiEntities[id];
            const entity = entities[id];

            entity.grantedQuota = payload.grantedQuota;
            entity.rateType = payload.rateType;
            entity.rate = payload.rate;
            entity.lenderComments = payload.comments;
            entity.status = LENDER_QUOTA_REQUEST_STATUS.PENDING_PAYER_APPROVAL;
            uiEntity.update.submitting = false;
            uiEntity.expanded = false;
        });

        this.setState(newState);
    }

    updateError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.update.submitting = false;
            uiEntity.update.error = payload;
        });

        this.setState(newState);
    }

    approve(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.approve.submitting = true;
            uiEntity.approve.error = null;
        });

        this.setState(newState);
    }

    approveSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.status = 'APPROVED';
            uiEntity.approve.submitting = false;
            uiEntity.expanded = false;
        });

        this.setState(newState);
    }

    approveError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.approve.submitting = false;
            uiEntity.approve.error = payload;
        });

        this.setState(newState);
    }

    reject(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.reject.submitting = true;
            uiEntity.reject.error = null;
        });

        this.setState(newState);
    }

    rejectSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.status = 'REJECTED';
            uiEntity.reject.submitting = false;
            uiEntity.expanded = false;
        });

        this.setState(newState);
    }

    rejectError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.reject.submitting = false;
            uiEntity.reject.error = payload;
        });

        this.setState(newState);
    }

    quotaRequest(id: number) {
        this.setState(initialState);

        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id] || this.createInitialUIState();

            uiEntity.quotaRequest.submitting = true;
            uiEntity.quotaRequest.error = null;

            uiEntities[id] = uiEntity;
        });

        this.setState(newState);
    }

    quotaRequestSuccess(id:number){
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.quotaRequest.submitting = false;
        });

        this.setState(newState);
    }

    quotaRequestError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.quotaRequest.submitting = false;
            uiEntity.quotaRequest.error = payload;
        });

        this.setState(newState);
    }
}
