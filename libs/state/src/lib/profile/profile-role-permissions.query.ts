import { Injectable } from '@angular/core';
import { CodePermission, RolePermission, UserRole } from '@libera/models/user';
import { EntityQuery } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { map, tap } from 'rxjs/operators';
import { ProfileRolePermissionsStore } from './profile-role-permissions.store';

@Injectable({
    providedIn: 'root',
})
export class ProfileRolePermissionsQuery extends EntityQuery<UserRole> {
    constructor(private store: ProfileRolePermissionsStore) {
        super(store);
    }

    hasPermission(permissionCode: CodePermission): Observable<boolean> {
        return this.selectEntities().pipe(
            map(roles => {
                const permissionsMatch = [];
                roles.forEach(rol => {
                    const permissions = rol.permissions.filter( permission => permission.code === permissionCode);
                    if (permissions.length > 0) permissionsMatch.push(permissions);
                })
                return permissionsMatch;
            }),
            map(roles => roles.length > 0),
        );
    }
}
