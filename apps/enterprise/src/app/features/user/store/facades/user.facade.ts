import { Injectable } from '@angular/core';
import {
    EnterpriseUserPayload,
    ToggleEnterpriseUserStatusPayload,
} from '@libera/models/enterprise';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromActions from '../actions/user.actions';
import { getActiveUserId } from '../selectors/active.selectors';
import {
    getActiveUser,
    isDeletingActiveUser,
    isUpdatingActiveUser,
} from '../selectors/user.selectors';

@Injectable({
    providedIn: 'root',
})
export class UserFacade {
    id$ = this.store.pipe(select(getActiveUserId));

    isUpdating$ = this.store.pipe(select(isUpdatingActiveUser));

    isDeleting$ = this.store.pipe(select(isDeletingActiveUser));

    user$ = this.store.pipe(select(getActiveUser));

    updateSuccess$ = this.actions$.pipe(
        ofType<fromActions.UpdateUserSuccess>(
            fromActions.UserActionTypes.UpdateUserSuccess
        )
    );

    deleteSuccess$ = this.actions$.pipe(
        ofType<fromActions.DeleteUserSuccess>(
            fromActions.UserActionTypes.DeleteUserSuccess
        )
    );

    constructor(private store: Store<any>, private actions$: Actions) {}

    openEditDialog(id: number) {
        this.store.dispatch(new fromActions.OpenEditDialog(id));
    }

    openDeleteDialog(id: number) {
        this.store.dispatch(new fromActions.OpenDeleteDialog(id));
    }

    update(payload: EnterpriseUserPayload) {
        this.id$
            .pipe(take(1))
            .subscribe(id =>
                this.store.dispatch(new fromActions.UpdateUser(id, payload))
            );
    }

    delete() {
        this.id$
            .pipe(take(1))
            .subscribe(id =>
                this.store.dispatch(new fromActions.DeleteUser(id))
            );
    }

    toggleStatus(payload: ToggleEnterpriseUserStatusPayload) {
        this.store.dispatch(
            new fromActions.PatchStatus(
                payload.id,
                payload.enabled ? 'ENABLED' : 'DISABLED'
            )
        );
    }

    resendInvitation(id: number) {
        this.store.dispatch(new fromActions.ResendInvitation(id));
    }
}
