import { Injectable } from '@angular/core';
import { DocumentNumber } from '@libera/models/enterprise';
import { EntityListStore, EntityListStoreState } from '@mediomelon/ng-core';

const initialState: EntityListStoreState<DocumentNumber> = {
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
        },
        page: {
            index: 0
        },
        total: null,
    },
};

@Injectable({
    providedIn: 'root',
})
export class DocumentNumberStore extends EntityListStore<DocumentNumber> {
    constructor() {
        super(initialState);
    }
}