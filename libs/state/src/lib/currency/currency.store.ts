import { Injectable } from '@angular/core';
import { Currency } from '@libera/models/catalog';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<Currency> = {
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
export class CurrencyStore extends EntityStore<Currency> {
    constructor() {
        super(initialState, 'code');
    }
}
