import { Injectable } from '@angular/core';
import { CountryCallingCode } from '@libera/models/catalog';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<CountryCallingCode> = {
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
export class CountryCallingCodeStore extends EntityStore<CountryCallingCode> {
    constructor() {
        super(initialState);
    }
}
