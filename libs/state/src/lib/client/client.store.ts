import { Injectable } from '@angular/core';
import { Client } from '@libera/models/client';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<Client> = {
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
export class ClientStore extends EntityStore<Client> {
    constructor() {
        super(initialState);
    }
}