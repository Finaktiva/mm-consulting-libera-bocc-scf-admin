import { Injectable } from '@angular/core';
import { economicActivity } from '@libera/models/ciuu-act-sec';
import { EntityListStore, EntityListStoreState } from '@mediomelon/ng-core';

const initialState: EntityListStoreState<
    economicActivity
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
export class CiiuActSecStore extends EntityListStore<economicActivity> {
    constructor() {
        super(initialState);
    }
}