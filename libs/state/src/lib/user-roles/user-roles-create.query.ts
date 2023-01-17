import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';

import { UserRolesCreateStore } from './user-roles-create.store';

@Injectable({
    providedIn: 'root',
})
export class UserRolesCreateQuery extends SubmitQuery {
    constructor(private store: UserRolesCreateStore) {
        super(store);
    }
}
