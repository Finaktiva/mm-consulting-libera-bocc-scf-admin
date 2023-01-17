import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { PayerInvoice, PayerInvoicePaginationFiltersPayload } from '@libera/models/payer';
import { Enterprise, InvoiceStatus } from '@libera/models/shared';
import { EntityListSelectionStore, SelectionUIState } from '@libera/state';
import { EntityListStoreState, SubmitStoreState } from '@mediomelon/ng-core';
import produce from 'immer';

export interface PayerInvoiceUI extends SelectionUIState {
    editingProvider: boolean;
    delete: SubmitStoreState;
    updateProvider: SubmitStoreState;
    negotiate: SubmitStoreState;
    editingLender: boolean;
    updateLender: SubmitStoreState;
    // negotiations: EnterpriseInvoiceNegotationUI;
}

const initialState: EntityListStoreState<
    PayerInvoice,
    PayerInvoiceUI,
    PayerInvoicePaginationFiltersPayload
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
            status: null,
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
export class PayerInvoiceStore extends EntityListSelectionStore<
    PayerInvoice,
    PayerInvoiceUI,
    PayerInvoicePaginationFiltersPayload
> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): PayerInvoiceUI {
        return {
            loaded: false,
            loading: false,
            error: null,
            editingProvider: false,
            editingLender: false,
            delete: {
                submitting: false,
                error: null,
            },
            updateProvider: {
                submitting: false,
                error: null,
            },
            negotiate: {
                submitting: false,
                error: null,
            },
            updateLender: {
                submitting: false,
                error: null,
            },
            selected: false,
        };
    }

    updateStatus(id: number, status: InvoiceStatus) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities } = draft;
            const entity = entities[id];
            entity.status = status;
        });

        this.setState(newState);
    }

    negotiate(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.negotiate.submitting = true;
            uiEntity.negotiate.error = null;
        });

        this.setState(newState);
    }

    negotiateSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.status = 'NEGOTIATION_IN_PROGRESS';
            uiEntity.negotiate.submitting = false;
        });

        this.setState(newState);
    }

    negotiateError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.negotiate.submitting = false;
            uiEntity.negotiate.error = payload;
        });

        this.setState(newState);
    }

    updateProvider(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.updateProvider.submitting = true;
            uiEntity.updateProvider.error = null;
        });

        this.setState(newState);
    }

    updateProviderSuccess(id: number, payload: Enterprise) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities, entities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.provider = payload;
            uiEntity.editingProvider = false;
            uiEntity.updateProvider.submitting = false;
        });

        this.setState(newState);
    }

    updateProviderError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.updateProvider.submitting = false;
            uiEntity.updateProvider.error = payload;
        });

        this.setState(newState);
    }

    editProvider(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.editingProvider = true;
        });

        this.setState(newState);
    }

    cancelProvider(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.editingProvider = false;
        });

        this.setState(newState);
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

    updateLender(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.updateLender.submitting = true;
            uiEntity.updateLender.error = null;
        });

        this.setState(newState);
    }

    updateLenderSuccess(id: number, payload: Enterprise) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities, entities } = draft;
            const entity = entities[id];
            const uiEntity = uiEntities[id];

            entity.lender = payload;
            uiEntity.editingLender = false;
            uiEntity.updateLender.submitting = false;
        });

        this.setState(newState);
    }

    updateLenderError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.updateLender.submitting = false;
            uiEntity.updateLender.error = payload;
        });

        this.setState(newState);
    }

    editLender(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.editingLender = true;
        });

        this.setState(newState);
    }

    cancelLender(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const uiEntity = uiEntities[id];

            uiEntity.editingLender = false;
        });

        this.setState(newState);
    }

    toggleAll(selected: boolean) {
        const { ids, entities } = this.getState();
        super.toggleAll(
            selected,
            ids.filter(
                id =>
                    entities[id].status == 'LOADED' ||
                    entities[id].status == 'AVAILABLE'
            )
        );
    }
}
