import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { EnterpriseProvider, EnterpriseProviderFilterPayload } from '@libera/models/enterprise';
import { EntityListStore, EntityListStoreState, UIState } from '@mediomelon/ng-core';

export interface EnterpriseProviderUI extends UIState {}

const initialState: EntityListStoreState<
    EnterpriseProvider,
    EnterpriseProviderUI,
    EnterpriseProviderFilterPayload
> = {
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
export class ProviderStore extends EntityListStore<
    EnterpriseProvider,
    EnterpriseProviderUI,
    EnterpriseProviderFilterPayload
> {
    constructor() {
        super(initialState);
    }
}
