import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { EnterpriseProviderBulk } from '@libera/models/enterprise';
import { EntityListStore, EntityListStoreState } from '@mediomelon/ng-core';

const initialState: EntityListStoreState<EnterpriseProviderBulk> = {
    entities: {},
    uiEntities: {},
    loaded: false,
    loading: false,
    error: null,
    ids: [],
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
};

@Injectable({
    providedIn: 'root',
})
export class ProviderBulkStore extends EntityListStore<EnterpriseProviderBulk> {
    constructor() {
        super(initialState);
    }
}
