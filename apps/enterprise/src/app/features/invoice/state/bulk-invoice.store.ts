import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { BulkInvoice } from '@libera/models/bulk-invoice';
import { EntityListStore, EntityListStoreState, UIState } from '@mediomelon/ng-core';

const initialState: EntityListStoreState<BulkInvoice, UIState> = {
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
    },
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class BulkInvoiceStore extends EntityListStore<BulkInvoice, UIState> {
    constructor() {
        super(initialState);
    }
}
