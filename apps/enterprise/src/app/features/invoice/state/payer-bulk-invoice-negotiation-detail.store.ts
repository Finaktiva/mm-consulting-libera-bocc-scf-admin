import { Injectable } from '@angular/core';
import {
    BulkInvoiceNegotiationCounterOfferPayload,
    BulkInvoiceNegotiationDetail,
} from '@libera/models/bulk-invoice-negotiation';
import { EntityStore, EntityStoreState, SubmitStoreState, UIState } from '@mediomelon/ng-core';
import produce from 'immer';

import { calculateDiscount } from '../utils';

const initialState: EntityStoreState = {
    entities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
    uiEntities: {},
};

export interface PayerBulkInvoiceNegotiationDetailUIState extends UIState {
    acceptOffer: SubmitStoreState;
    counterOffer: SubmitStoreState;
    rejectOffer: SubmitStoreState;
    cancelOffer: SubmitStoreState;
}

@Injectable({
    providedIn: 'root',
})
export class PayerBulkInvoiceNegotiationDetailStore extends EntityStore<
    BulkInvoiceNegotiationDetail,
    PayerBulkInvoiceNegotiationDetailUIState
> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): PayerBulkInvoiceNegotiationDetailUIState {
        return {
            error: null,
            loaded: false,
            loading: false,
            acceptOffer: {
                error: null,
                submitting: false,
            },
            counterOffer: {
                error: null,
                submitting: false,
            },
            rejectOffer: {
                error: null,
                submitting: false,
            },
            cancelOffer: {
                error: null,
                submitting: false,
            },
        };
    }

    acceptOffer(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.acceptOffer.error = null;
            uiEntity.acceptOffer.submitting = true;
        });

        this.setState(newState);
    }

    acceptOfferSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities, entities } = draft;

            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.negotiation.status = 'APPROVED';

            uiEntity.acceptOffer.submitting = false;
        });

        this.setState(newState);
    }

    acceptOfferError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.acceptOffer.error = error;
            uiEntity.acceptOffer.submitting = false;
        });

        this.setState(newState);
    }

    makeCounterOffer(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.counterOffer.error = null;
            uiEntity.counterOffer.submitting = true;
        });

        this.setState(newState);
    }

    makeCounterOfferSuccess(
        id: number,
        payload: BulkInvoiceNegotiationCounterOfferPayload
    ) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities, entities } = draft;

            const entity = entities[id];
            const { invoices } = entity;

            const uiEntity = uiEntities[id];

            const discountValue: number = invoices.reduce(
                (previousValue, invoice) =>
                    calculateDiscount(
                        invoice.amount,
                        payload.discountType,
                        invoice.expirationDate,
                        invoice.emissionDate,
                        payload.percentage
                    ) + previousValue,
                0
            );

            entity.negotiation.payerOffer = {
                discountValue,
                ...payload,
            };

            entity.negotiation.status = 'PROVIDER_PENDING_RESPONSE';

            uiEntity.counterOffer.submitting = false;
        });

        this.setState(newState);
    }

    makeCounterOfferError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.counterOffer.error = error;
            uiEntity.counterOffer.submitting = false;
        });

        this.setState(newState);
    }

    rejectOffer(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.rejectOffer.error = null;
            uiEntity.rejectOffer.submitting = true;
        });

        this.setState(newState);
    }

    rejectOfferSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities, entities } = draft;

            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.negotiation.status = 'REJECTED';

            uiEntity.rejectOffer.submitting = false;
        });

        this.setState(newState);
    }

    rejectOfferError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.rejectOffer.error = error;
            uiEntity.rejectOffer.submitting = false;
        });

        this.setState(newState);
    }

    cancelOffer(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.cancelOffer.error = null;
            uiEntity.cancelOffer.submitting = true;
        });

        this.setState(newState);
    }

    cancelOfferSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities, entities } = draft;

            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.negotiation.status = 'CANCELLED';

            uiEntity.cancelOffer.submitting = false;
        });

        this.setState(newState);
    }

    cancelOfferError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.cancelOffer.error = error;
            uiEntity.cancelOffer.submitting = false;
        });

        this.setState(newState);
    }
}
