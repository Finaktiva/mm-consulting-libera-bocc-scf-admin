import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { Lender, LenderListPaginationFilterPayload } from '@libera/models/lender';
import { EntityListStore, EntityListStoreState, UIState } from '@mediomelon/ng-core';

const initialState: EntityListStoreState<
    Lender,
    UIState,
    LenderListPaginationFilterPayload
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
export class LenderStore extends EntityListStore<
    Lender,
    UIState,
    LenderListPaginationFilterPayload
> {
    constructor() {
        super(initialState);
    }
}
