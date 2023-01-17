import { Injectable } from '@angular/core';
import { RolePermission } from '@libera/models/catalog';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<RolePermission> = {
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
export class RolePermissionsStore extends EntityStore<RolePermission> {
    constructor() {
        super(initialState);
    }
}