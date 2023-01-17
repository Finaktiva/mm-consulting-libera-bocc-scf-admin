import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnterpriseService } from '@libera/api';
import { AuthenticationFacade } from '@libera/authentication';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import * as fromActions from '../actions/user.actions';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CreateUserEffects {
    @Effect()
    create$: Observable<
        fromActions.CreateUserSuccess | fromActions.CreateUserError
    > = this.actions$.pipe(
        ofType<fromActions.CreateUser>(fromActions.UserActionTypes.CreateUser),
        withLatestFrom(this.authenticationFacade.enterpriseId$),
        switchMap(([{ payload }, id]) => {
            return this.enterpriseService.createUser(id, payload).pipe(
                map(user => new fromActions.CreateUserSuccess(user)),
                catchError(error => of(new fromActions.CreateUserError(error)))
            );
        })
    );

    @Effect({
        dispatch: false,
    })
    createSuccess$: Observable<
        fromActions.CreateUserSuccess
    > = this.actions$.pipe(
        ofType<fromActions.CreateUserSuccess>(
            fromActions.UserActionTypes.CreateUserSuccess
        ),
        tap(() =>
            this.snackbar.open(
                this.translateService.instant('CREATE_EFFECTS.SUCCESS'),
                'OK'
            )
        )
    );

    @Effect({
        dispatch: false,
    })
    createError$: Observable<fromActions.CreateUserError> = this.actions$.pipe(
        ofType<fromActions.CreateUserError>(
            fromActions.UserActionTypes.CreateUserError
        ),
        tap(() =>
            this.snackbar.open(
                this.translateService.instant('CREATE_EFFECTS.ERROR'),
                'OK'
            )
        )
    );

    constructor(
        private actions$: Actions,
        private authenticationFacade: AuthenticationFacade,
        private enterpriseService: EnterpriseService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService
    ) { }
}
