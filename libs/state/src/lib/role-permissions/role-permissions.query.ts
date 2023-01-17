import { Injectable } from '@angular/core';
import { RolePermission } from '@libera/models/catalog';
import { EntityQuery } from '@mediomelon/ng-core';

import { RolePermissionsStore } from './role-permissions.store';

@Injectable({
    providedIn: 'root',
})
export class RolePermissionsQuery extends EntityQuery<RolePermission> {
    constructor(store: RolePermissionsStore) {
        super(store);
    }
}