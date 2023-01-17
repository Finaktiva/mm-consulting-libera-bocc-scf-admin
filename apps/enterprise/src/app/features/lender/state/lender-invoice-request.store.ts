import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import {
    LenderInvoice,
    LenderInvoiceRequestPaginationFiltersPayload,
    LenderInvoiceStatus,
} from '@libera/models/lender';
import {
    EntityListStore,
    EntityListStoreState,
    UIState,
} from '@mediomelon/ng-core';
import produce from 'immer';

const initialState: EntityListStoreState<
    LenderInvoice,
    UIState,
    LenderInvoiceRequestPaginationFiltersPayload
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
        filters: {
            filter_by: null,
            q: null,
        },
        total: null,
    },
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class LenderInvoiceRequestStore extends EntityListStore<
    LenderInvoice,
    UIState,
    LenderInvoiceRequestPaginationFiltersPayload
> {
    constructor() {
        super(initialState, 'invoiceId');
    }

    changeStatus(id: number, status: LenderInvoiceStatus) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities } = draft;
            const entity = entities[id];
            if (entity) entity.status = status;
        });

        this.setState(newState);
    }
}
