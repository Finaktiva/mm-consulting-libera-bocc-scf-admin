import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnterpriseService } from '@libera/api';
import { AuthenticationFacade } from '@libera/authentication';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { DeleteUserDialog } from '../../dialogs/delete-user/delete-user.dialog';
import { UpdateUserDialog } from '../../dialogs/update-user/update-user.dialog';
import * as fromActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
    @Effect()
    update$: Observable<
        fromActions.UpdateUserSuccess | fromActions.UpdateUserError
    > = this.actions$.pipe(
        ofType<fromActions.UpdateUser>(fromActions.UserActionTypes.UpdateUser),
        withLatestFrom(this.authenticationFacade.enterpriseId$),
        mergeMap(([{ id: userId, payload }, enterpriseId]) => {
            return this.enterpriseService
                .updateUser(enterpriseId, userId, payload)
                .pipe(
                    map(
                        () => new fromActions.UpdateUserSuccess(userId, payload)
                    ),
                    catchError(error =>
                        of(new fromActions.UpdateUserError(userId, error))
                    )
                );
        })
    );

    @Effect({
        dispatch: false,
    })
    updateError$: Observable<fromActions.UpdateUserError> = this.actions$.pipe(
        ofType<fromActions.UpdateUserError>(
            fromActions.UserActionTypes.UpdateUserError
        ),
        tap(() =>
            this.snackbar.open(
                'Hubo un error al actualizar el usuario. Intentelo de nuevo.'
            )
        )
    );

    @Effect()
    delete$: Observable<
        fromActions.DeleteUserSuccess | fromActions.DeleteUserError
    > = this.actions$.pipe(
        ofType<fromActions.DeleteUser>(fromActions.UserActionTypes.DeleteUser),
        withLatestFrom(this.authenticationFacade.enterpriseId$),
        mergeMap(([{ payload: userId }, enterpriseId]) => {
            return this.enterpriseService.deleteUser(enterpriseId, userId).pipe(
                map(() => new fromActions.DeleteUserSuccess(userId)),
                catchError(error =>
                    of(new fromActions.DeleteUserError(userId, error))
                )
            );
        })
    );

    @Effect({
        dispatch: false,
    })
    deleteError$: Observable<fromActions.DeleteUserError> = this.actions$.pipe(
        ofType<fromActions.DeleteUserError>(
            fromActions.UserActionTypes.DeleteUserError
        ),
        tap(() =>
            this.snackbar.open(
                'Hubo un error al eliminar el usuario. Intentelo de nuevo.'
            )
        )
    );

    @Effect()
    patchStatus$: Observable<
        fromActions.PatchStatusSuccess | fromActions.PatchStatusError
    > = this.actions$.pipe(
        ofType<fromActions.PatchStatus>(
            fromActions.UserActionTypes.PatchStatus
        ),
        withLatestFrom(this.authenticationFacade.enterpriseId$),
        mergeMap(([{ id: userId, payload }, enterpriseId]) => {
            return this.enterpriseService
                .toggleStatus(enterpriseId, userId, payload)
                .pipe(
                    map(() => new fromActions.PatchStatusSuccess(userId)),
                    catchError(error =>
                        of(
                            new fromActions.PatchStatusError(
                                userId,
                                payload == 'ENABLED' ? 'DISABLED' : 'ENABLED',
                                error
                            )
                        )
                    )
                );
        })
    );

    @Effect({
        dispatch: false,
    })
    patchStatusError$: Observable<
        fromActions.PatchStatusError
    > = this.actions$.pipe(
        ofType<fromActions.PatchStatusError>(
            fromActions.UserActionTypes.PatchStatusError
        ),
        tap(() =>
            this.snackbar.open(
                'Hubo un error al cambiar el estatus del usuario. Intentelo de nuevo.'
            )
        )
    );

    @Effect()
    openEditDialog$ = this.actions$.pipe(
        ofType<fromActions.OpenEditDialog>(
            fromActions.UserActionTypes.OpenEditDialog
        ),
        switchMap(() => this.dialog.open(UpdateUserDialog).afterClosed()),
        map(() => new fromActions.CloseEditDialog())
    );

    @Effect()
    openDeleteDialog$ = this.actions$.pipe(
        ofType<fromActions.OpenDeleteDialog>(
            fromActions.UserActionTypes.OpenDeleteDialog
        ),
        switchMap(() => this.dialog.open(DeleteUserDialog).afterClosed()),
        map(() => new fromActions.CloseDeleteDialog())
    );

    @Effect()
    resendInvitation$: Observable<
        fromActions.ResendInvitationSuccess | fromActions.ResendInvitationError
    > = this.actions$.pipe(
        ofType<fromActions.ResendInvitation>(
            fromActions.UserActionTypes.ResendInvitation
        ),
        withLatestFrom(this.authenticationFacade.enterpriseId$),
        switchMap(([{ id }, enterpriseId]) =>
            this.enterpriseService
                .resendInvitationToUser(enterpriseId, id)
                .pipe(
                    map(() => new fromActions.ResendInvitationSuccess()),
                    catchError(err =>
                        of(new fromActions.ResendInvitationError(err))
                    )
                )
        )
    );

    @Effect({ dispatch: false })
    resendInvitationSuccess$ = this.actions$.pipe(
        ofType(fromActions.UserActionTypes.ResendInvitationSuccess),
        tap(() => this.snackbar.open('Invitación reenviada.', 'OK'))
    );

    @Effect({ dispatch: false })
    resendInvitationError$ = this.actions$.pipe(
        ofType(fromActions.UserActionTypes.ResendInvitationError),
        tap(() =>
            this.snackbar.open('Ha ocurrido un error. Intent de nuevo.', 'OK')
        )
    );

    constructor(
        private actions$: Actions,
        private enterpriseService: EnterpriseService,
        private authenticationFacade: AuthenticationFacade,
        private snackbar: MatSnackBar,
        private dialog: MatDialog
    ) {}
}
