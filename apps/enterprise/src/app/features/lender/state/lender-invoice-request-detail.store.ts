import { Injectable } from '@angular/core';
import {
    LenderInvoiceDetail,
    LENDER_INVOICE_STATUS,
} from '@libera/models/lender';
import {
    EntityStore,
    EntityStoreState,
    SubmitStoreState,
    UIState,
} from '@mediomelon/ng-core';
import produce from 'immer';
import { INVOICE_STATUS } from '@libera/models/shared';

export interface LenderInvoiceRequestDetailUI extends UIState {
    changeStatus: SubmitStoreState;
}

const initialState: EntityStoreState<LenderInvoiceDetail, UIState> = {
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
export class LenderInvoiceRequestDetailStore extends EntityStore<
    LenderInvoiceDetail,
    LenderInvoiceRequestDetailUI
> {
    constructor() {
        super(initialState, 'invoiceId');
    }

    createInitialUIState(): LenderInvoiceRequestDetailUI {
        return {
            error: null,
            loaded: false,
            loading: false,
            changeStatus: {
                error: null,
                submitting: false,
            },
        };
    }

    confirm(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.changeStatus.error = null;
            uiEntity.changeStatus.submitting = true;
        });

        this.setState(newState);
    }

    confirmSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.fundStatus =
                LENDER_INVOICE_STATUS.PENDING_PROVIDER_PAYMENT_CONFIRMATION;
            uiEntity.changeStatus.submitting = false;
        });

        this.setState(newState);
    }

    confirmError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.changeStatus.error = payload;
            uiEntity.changeStatus.submitting = false;
        });

        this.setState(newState);
    }

    reject(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.changeStatus.error = null;
            uiEntity.changeStatus.submitting = true;
        });

        this.setState(newState);
    }

    rejectSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.fundStatus = LENDER_INVOICE_STATUS.REJECTED;
            uiEntity.changeStatus.submitting = false;
        });

        this.setState(newState);
    }

    rejectError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.changeStatus.error = payload;
            uiEntity.changeStatus.submitting = false;
        });

        this.setState(newState);
    }
}
