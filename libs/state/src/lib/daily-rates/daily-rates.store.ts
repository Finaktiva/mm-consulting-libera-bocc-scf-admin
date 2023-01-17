import { Injectable } from '@angular/core';
import { DailyRate } from '@libera/models/catalog';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<DailyRate> = {
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
export class DailyRatesStore extends EntityStore<DailyRate> {
    constructor() {
        super(initialState);
    }
}