import { Injectable } from '@angular/core';
import { EnterpriseUserPayload } from '@libera/models/enterprise';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import * as fromActions from '../actions/user.actions';
import { getCreateUserError, isCreatingUser } from '../selectors/create.selectors';

@Injectable({
    providedIn: 'root',
})
export class CreateUserFacade {
    isSubmitting$ = this.store.pipe(select(isCreatingUser));

    error$ = this.store.pipe(select(getCreateUserError));

    createSuccess$ = this.actions$.pipe(
        ofType<fromActions.CreateUserSuccess>(
            fromActions.UserActionTypes.CreateUserSuccess
        )
    );

    constructor(private store: Store<any>, private actions$: Actions) {}

    create(payload: EnterpriseUserPayload) {
        this.store.dispatch(new fromActions.CreateUser(payload));
    }
}
