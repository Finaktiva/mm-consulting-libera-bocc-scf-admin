import { Injectable } from '@angular/core';
import { UserRole } from '@libera/models/user';
import { EntityListQuery } from '@mediomelon/ng-core';

import { UserRoleStore, UserRoleUI } from './user-roles.store';

@Injectable({
    providedIn: 'root',
})
export class UserRoleQuery extends EntityListQuery<UserRole, UserRoleUI> {
    constructor(store: UserRoleStore) {
        super(store);
    }
}