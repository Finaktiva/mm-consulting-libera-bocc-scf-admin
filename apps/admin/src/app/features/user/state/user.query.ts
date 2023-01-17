import { Injectable } from '@angular/core';
import { User, UserStatus } from '@libera/models/user';
import { EntityListQuery } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { UserStore, UserUI } from './user.store';

@Injectable({
    providedIn: 'root',
})
export class UserQuery extends EntityListQuery<User, UserUI> {
    constructor(private store: UserStore) {
        super(store);
    }

    selectTogglingStatus(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => entity.patchStatus.submitting)
        );
    }

    selectEntityUpdating(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            map(entity => entity.update.submitting),
            distinctUntilChanged()
        );
    }

    selectEntityDeleting(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            map(entity => (entity ? entity.delete.submitting : false))
        );
    }

    getStatus(id: number): UserStatus {
        const entity = this.getEntity(id);
        return entity.status;
    }
}
