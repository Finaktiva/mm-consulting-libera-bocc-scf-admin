import { Injectable } from '@angular/core';
import { UserRole } from '@libera/models/user';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<UserRole> = {
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
export class ProfileRolePermissionsStore extends EntityStore<UserRole> {
    constructor() {
        super(initialState);
    }
}
