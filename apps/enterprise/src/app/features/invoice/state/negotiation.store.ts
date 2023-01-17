import { Injectable } from '@angular/core';
import { InvoiceNegotiation, NegotiationOffer } from '@libera/models/shared';
import { EntityStore, EntityStoreState, SubmitStoreState, UIState } from '@mediomelon/ng-core';
import produce from 'immer';

export interface InvoiceNegotiationUI extends UIState {
    editingOffer: boolean;
    offer: SubmitStoreState;
    reject: SubmitStoreState;
    accept: SubmitStoreState;
    cancel: SubmitStoreState;
}

const initialState: EntityStoreState<
    InvoiceNegotiation,
    InvoiceNegotiationUI
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
export class NegotiationStore extends EntityStore<
    InvoiceNegotiation,
    InvoiceNegotiationUI
> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): InvoiceNegotiationUI {
        return {
            loaded: false,
            loading: false,
            error: null,
            editingOffer: false,
            offer: {
                error: null,
                submitting: false,
            },
            reject: {
                error: null,
                submitting: false,
            },
            accept: {
                error: null,
                submitting: false,
            },
            cancel: {
                error: null,
                submitting: false,
            },
        };
    }

    cancel(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.cancel.submitting = true;
            uiEntity.cancel.error = null;
        });

        this.setState(newState);
    }

    cancelSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.status = 'CANCELLED';
            entity.payerOffer = null;
            entity.providerOffer = null;
            uiEntity.cancel.submitting = false;
            uiEntity.cancel.error = null;
        });

        this.setState(newState);
    }

    cancelError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.cancel.submitting = false;
            uiEntity.cancel.error = payload;
        });

        this.setState(newState);
    }

    rejectOffer(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.reject.submitting = true;
            uiEntity.reject.error = null;
        });

        this.setState(newState);
    }

    rejectOfferSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.status = 'REJECTED';
            uiEntity.reject.submitting = false;
        });

        this.setState(newState);
    }

    rejectOfferError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.reject.submitting = false;
            uiEntity.reject.error = payload;
        });

        this.setState(newState);
    }

    acceptOffer(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.accept.submitting = true;
            uiEntity.accept.error = null;
        });

        this.setState(newState);
    }

    acceptOfferSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.status = 'APPROVED';
            uiEntity.accept.submitting = false;
        });

        this.setState(newState);
    }

    acceptOfferError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.accept.submitting = false;
            uiEntity.accept.error = payload;
        });

        this.setState(newState);
    }

    editOffer(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.editingOffer = true;
        });

        this.setState(newState);
    }

    closeOffer(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.editingOffer = false;
        });

        this.setState(newState);
    }

    updateOffer(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.offer.submitting = true;
            uiEntity.offer.error = null;
        });

        this.setState(newState);
    }

    updateProviderOfferSuccess(id: number, payload: NegotiationOffer) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.status = 'PAYER_PENDING_RESPONSE';
            entity.providerOffer = payload;
            uiEntity.offer.submitting = false;
            uiEntity.editingOffer = false;
        });

        this.setState(newState);
    }

    updatePayerOfferSuccess(id: number, payload: NegotiationOffer) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.status = 'PROVIDER_PENDING_RESPONSE';
            entity.payerOffer = payload;
            uiEntity.offer.submitting = false;
            uiEntity.editingOffer = false;
        });

        this.setState(newState);
    }

    updateOfferError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];
            uiEntity.offer.submitting = false;
            uiEntity.offer.error = payload;
        });

        this.setState(newState);
    }
}
