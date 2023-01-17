import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import {
    BulkInvoiceNegotiationListPaginationFilterPayload,
    ProviderBulkInvoiceNegotiation,
} from '@libera/models/bulk-invoice-negotiation';
import { EntityListStore, EntityListStoreState, UIState } from '@mediomelon/ng-core';

const initialState: EntityListStoreState<
    ProviderBulkInvoiceNegotiation,
    UIState,
    BulkInvoiceNegotiationListPaginationFilterPayload
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
        total: null,
        filters: {
            filter_by: null,
            q: null,
        },
    },
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class ProviderBulkInvoiceNegotiationStore extends EntityListStore<
    ProviderBulkInvoiceNegotiation,
    UIState,
    BulkInvoiceNegotiationListPaginationFilterPayload
> {
    constructor() {
        super(initialState);
    }
}
