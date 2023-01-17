import { Injectable } from '@angular/core';
import { Duty } from '@libera/models/duty';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<Duty> = {
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
export class DutyStore extends EntityStore<Duty> {
    constructor() {
        super(initialState);
    }
}