import { Injectable } from '@angular/core';
import { CitiesAndDepartments } from '@libera/models/catalog';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<CitiesAndDepartments> = {
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
export class CitiesAndDepartmentsStore extends EntityStore<CitiesAndDepartments> {
    constructor() {
        super(initialState);
    }
}
