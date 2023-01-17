import { Injectable } from '@angular/core';
import { CatalogService } from '@libera/api';
import { UserType } from '@libera/models/authentication';
import { tap } from 'rxjs/operators';

import { RolePermissionsQuery } from './role-permissions.query';
import { RolePermissionsStore } from './role-permissions.store';

@Injectable({
    providedIn: 'root',
})
export class RolePermissionsService {
    constructor(
        private query: RolePermissionsQuery,
        private store: RolePermissionsStore,
        private catalogService: CatalogService
    ) {}


    fetchAll(userType: UserType) {
        this.store.fetchAll();
        return this.catalogService
            .getRolePermissions(userType)
            .pipe(
                tap(
                    payload => this.store.fetchAllSuccess(payload),
                    error => this.store.fetchAllError(error)
                )
            );
    }
}