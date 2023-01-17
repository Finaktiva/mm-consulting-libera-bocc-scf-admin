import { Injectable } from '@angular/core';
import { EnterpriseSector } from '@libera/models/catalog';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<EnterpriseSector> = {
    entities: {},
    uiEntities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
};

@Injectable({
    providedIn: 'root',
})
export class EnterpriseSectorStore extends EntityStore<EnterpriseSector> {
    constructor() {
        super(initialState);
    }
}
