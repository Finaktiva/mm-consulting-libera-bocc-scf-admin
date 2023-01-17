import { Injectable } from '@angular/core';
import { Bank } from '@libera/models/catalog';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<Bank> = {
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
export class BankStore extends EntityStore<Bank> {
    constructor() {
        super(initialState);
    }
}