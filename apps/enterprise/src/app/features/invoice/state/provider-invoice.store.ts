import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { ProviderInvoice, ProviderInvoicePaginationFiltersPayload } from '@libera/models/provider';
import { InvoiceStatus } from '@libera/models/shared';
import { EntityListStore, EntityListStoreState, UIState } from '@mediomelon/ng-core';
import produce from 'immer';

const initialState: EntityListStoreState<
    ProviderInvoice,
    UIState,
    ProviderInvoicePaginationFiltersPayload
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
export class ProviderInvoiceStore extends EntityListStore<
    ProviderInvoice,
    UIState
> {
    constructor() {
        super(initialState);
    }

    updateStatus(id: number, status: InvoiceStatus) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities } = draft;
            const entity = entities[id];
            if (!entity) return;
            entity.status = status;
        });

        this.setState(newState);
    }
}
