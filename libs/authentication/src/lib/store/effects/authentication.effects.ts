import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '@libera/api';
import { APP_ROUTES_PROVIDER, AppRoutes, SHOULD_MOCK_PROVIDER } from '@libera/environment';
import { CognitoExceptions, SignInPayload } from '@libera/models/authentication';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mapTo, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import * as fromActions from '../actions/authentication.actions';
import { AuthenticationFacade } from '../facades/authentication.facade';

@Injectable()
export class AuthenticationEffects {
    @Effect()
    loadState$: Observable<
        fromActions.LoadState
    > = this.authenticationService.authStateChange$.pipe(
        map(state => new fromActions.LoadState(state))
    );

    // @Effect()
    // signUp$: Observable<
    //     fromActions.SignUpSuccess | fromActions.SignUpError
    // > = this.actions$.pipe(
    //     ofType<fromActions.SignUp>(
    //         fromActions.AuthenticationActionTypes.SignUp
    //     ),
    //     switchMap(({ payload }) => {
    //         return this.authenticationService.signUp(payload).pipe(
    //             map(() => new fromActions.SignUpSuccess(payload.email)),
    //             catchError(error => of(new fromActions.SignUpError(error)))
    //         );
    //     })
    // );

    // @Effect({
    //     dispatch: false,
    // })
    // signUpSuccess$: Observable<fromActions.SignUpSuccess> = this.actions$.pipe(
    //     ofType<fromActions.SignUpSuccess>(
    //         fromActions.AuthenticationActionTypes.SignUpSuccess
    //     ),
    //     tap(() =>
    //         this.snackbar.open(
    //             'Le hemos enviado un código de verificación a su email',
    //             'ACEPTAR'
    //         )
    //     ),
    //     tap(({ payload: email }) =>
    //         this.router.navigate(['confirm-account'], {
    //             queryParams: { email },
    //         })
    //     )
    // );

    // @Effect({
    //     dispatch: false,
    // })
    // signUpError$: Observable<fromActions.SignUpError> = this.actions$.pipe(
    //     ofType<fromActions.SignUpError>(
    //         fromActions.AuthenticationActionTypes.SignUpError
    //     ),
    //     tap(({ payload }) => {
    //         const error = payload && payload.code;
    //         let message: string;

    //         if (error == CognitoExceptions.USERNAME_EXISTS)
    //             message = 'Ya existe una cuenta registrada con ese email';
    //         else message = 'Hubo un error al crear la cuenta';

    //         this.snackbar.open(message, 'ACEPTAR');
    //     })
    // );

    // @Effect()
    // confirmSignUp$: Observable<
    //     fromActions.ConfirmSignUpSuccess | fromActions.ConfirmSignUpError
    // > = this.actions$.pipe(
    //     ofType<fromActions.ConfirmSignUp>(
    //         fromActions.AuthenticationActionTypes.ConfirmSignUp
    //     ),
    //     switchMap(({ payload }) => {
    //         return this.authenticationService.confirmSignUp(payload).pipe(
    //             map(() => new fromActions.ConfirmSignUpSuccess()),
    //             catchError(error =>
    //                 of(new fromActions.ConfirmSignUpError(error))
    //             )
    //         );
    //     })
    // );

    // @Effect({
    //     dispatch: false,
    // })
    // confirmSignUpSuccess$: Observable<
    //     fromActions.ConfirmSignUpSuccess
    // > = this.actions$.pipe(
    //     ofType<fromActions.ConfirmSignUpSuccess>(
    //         fromActions.AuthenticationActionTypes.ConfirmSignUpSuccess
    //     ),
    //     tap(() =>
    //         this.snackbar.open(
    //             'Se ha confirmado su cuenta, ya puede iniciar sesión',
    //             'ACEPTAR'
    //         )
    //     ),
    //     tap(() => this.router.navigateByUrl('/sign-in'))
    // );

    // @Effect({
    //     dispatch: false,
    // })
    // confirmSignUpError$: Observable<
    //     fromActions.ConfirmSignUpError
    // > = this.actions$.pipe(
    //     ofType<fromActions.ConfirmSignUpError>(
    //         fromActions.AuthenticationActionTypes.ConfirmSignUpError
    //     ),
    //     tap(({ payload }) => {
    //         const error = payload && payload.code;
    //         let message: string;

    //         if (error == CognitoExceptions.NOT_AUTHORIZED)
    //             message = 'Ya se encuentra confirmada esta cuenta';
    //         else if (error == CognitoExceptions.USER_NOT_FOUND)
    //             message = 'No existe una cuenta con ese email';
    //         else if (error == CognitoExceptions.CODE_MISMATCH)
    //             message = 'El código de verificación es incorrecto';
    //         else message = 'Hubo un error al confirmar su cuenta';

    //         this.snackbar.open(message, 'ACEPTAR');
    //     })
    // );

    // @Effect()
    // signIn$: Observable<
    //     fromActions.SignInSuccess | fromActions.SignInError
    // > = this.actions$.pipe(
    //     ofType(fromActions.AuthenticationActionTypes.SignIn),
    //     map((action: fromActions.SignIn) => action.payload),
    //     switchMap((payload: SignInPayload) =>
    //         this.authenticationService.signIn(payload).pipe(
    //             map(() => new fromActions.SignInSuccess()),
    //             catchError(error =>
    //                 of(new fromActions.SignInError(error, payload.email))
    //             )
    //         )
    //     )
    // );

    // @Effect({ dispatch: false })
    // signInSuccess$ = this.actions$.pipe(
    //     ofType(fromActions.AuthenticationActionTypes.SignInSuccess),
    //     withLatestFrom(
    //         this.authenticationFacade.userType$,
    //         this.authenticationFacade.userState$
    //     ),
    //     tap(([, userType, userState]) => {
    //         if (userState === 'requireNewPassword')
    //             return this.router.navigate(['/complete-new-password']);
    //         if (userType == 'ENTERPRISE_USER')
    //             return this.document.location.assign(this.routes.enterprise);
    //         if (userType == 'LIBERA_USER')
    //             return this.document.location.assign(this.routes.admin);
    //         return this.snackbar.open(
    //             'Parece que tu cuenta no tiene roles asignados.',
    //             'OK'
    //         );
    //     })
    // );

    // @Effect({ dispatch: false })
    // signInError$: Observable<fromActions.SignInError> = this.actions$.pipe(
    //     ofType(fromActions.AuthenticationActionTypes.SignInError),
    //     tap(({ payload, email }: fromActions.SignInError) => {
    //         const error = payload.code;

    //         let message = 'Hubo un error al iniciar sesión, intente de nuevo.';

    //         if (error === CognitoExceptions.USER_NOT_FOUND)
    //             message =
    //                 'Los datos son incorrectos por favor verifique la información introducida.';

    //         if (error === CognitoExceptions.USER_NOT_CONFIRMED) {
    //             message = 'Verifica tu cuenta para poder iniciar sesión.';
    //             this.router.navigate(['/confirm-account'], {
    //                 queryParams: { email },
    //             });
    //         }

    //         this.snackbar.open(message, 'OK');
    //     })
    // );

    @Effect()
    signOut$: Observable<
        fromActions.SignOutSuccess | fromActions.SignOutError
    > = this.actions$.pipe(
        ofType<fromActions.SignOut>(
            fromActions.AuthenticationActionTypes.SignOut
        ),
        switchMap(() =>
            this.authenticationService.signOut().pipe(
                mapTo(new fromActions.SignOutSuccess()),
                catchError(error => of(new fromActions.SignOutError(error)))
            )
        )
    );

    @Effect({
        dispatch: false,
    })
    signOutSuccess$: Observable<
        fromActions.SignOutSuccess
    > = this.actions$.pipe(
        ofType<fromActions.SignOutSuccess>(
            fromActions.AuthenticationActionTypes.SignOutSuccess
        ),
        tap(() => this.document.location.assign(this.routes.landing))
    );

    @Effect({
        dispatch: false,
    })
    signOutError$: Observable<fromActions.SignOutError> = this.actions$.pipe(
        ofType<fromActions.SignOutError>(
            fromActions.AuthenticationActionTypes.SignOutError
        ),
        tap(() =>
            this.snackbar.open(
                'Hubo un problema al cerrar sesión. Intentelo de nuevo.',
                'OK'
            )
        )
    );

    // @Effect()
    // recoverPassword$: Observable<
    //     fromActions.RecoverPasswordSuccess | fromActions.RecoverPasswordError
    // > = this.actions$.pipe(
    //     ofType(fromActions.AuthenticationActionTypes.RecoverPassword),
    //     map((action: fromActions.RecoverPassword) => action.payload),
    //     switchMap(payload =>
    //         this.authenticationService.recoverPassword(payload).pipe(
    //             mapTo(new fromActions.RecoverPasswordSuccess()),
    //             catchError(err => of(new fromActions.RecoverPasswordError(err)))
    //         )
    //     )
    // );

    // @Effect()
    // resendRecoverPassword$: Observable<
    //     fromActions.RecoverPasswordSuccess | fromActions.RecoverPasswordError
    // > = this.actions$.pipe(
    //     ofType(fromActions.AuthenticationActionTypes.ResendRecoverPassword),
    //     withLatestFrom(this.authenticationFacade.recoverPasswordEmail$),
    //     switchMap(([, email]) =>
    //         this.authenticationService.recoverPassword({ email }).pipe(
    //             mapTo(new fromActions.RecoverPasswordSuccess()),
    //             catchError(err => of(new fromActions.RecoverPasswordError(err)))
    //         )
    //     )
    // );

    // @Effect({ dispatch: false })
    // recoverPasswordSuccess$: Observable<
    //     fromActions.RecoverPasswordSuccess
    // > = this.actions$.pipe(
    //     ofType(fromActions.AuthenticationActionTypes.RecoverPasswordSuccess),
    //     tap(() => {
    //         this.snackbar.open('Se ha enviado el correo', 'OK');
    //         this.router.navigate(['/forgot-password/email-sent']);
    //     })
    // );

    // @Effect({ dispatch: false })
    // recoverPasswordError$: Observable<
    //     fromActions.RecoverPasswordError
    // > = this.actions$.pipe(
    //     ofType(fromActions.AuthenticationActionTypes.RecoverPasswordError),
    //     tap(({ payload }: fromActions.RecoverPasswordError) => {
    //         const error = payload && payload.code;
    //         let message =
    //             'Hubo un error al enviar el correo, intente de nuevo en un par de minutos';

    //         if (error === CognitoExceptions.USER_NOT_FOUND)
    //             message =
    //                 'Correo no encontrado, por favor verifique la información introducida';
    //         else if (error === CognitoExceptions.USER_NOT_CONFIRMED)
    //             message = 'El usuario no ha sido verificado.';
    //         else if (error === CognitoExceptions.INVALID_PARAMETER)
    //             message =
    //                 'La cuenta aún no ha sido verificada, debe verificarla antes de poder cambiar su contraseña';

    //         this.snackbar.open(message, 'OK');
    //     })
    // );

    // @Effect()
    // sendConfirmationCode$: Observable<
    //     | fromActions.SendConfirmationCodeSuccess
    //     | fromActions.SendConfirmationCodeError
    // > = this.actions$.pipe(
    //     ofType<fromActions.SendConfirmationCode>(
    //         fromActions.AuthenticationActionTypes.SendConfirmationCode
    //     ),
    //     switchMap(({ payload }) =>
    //         this.authenticationService.sendConfirmationCode(payload).pipe(
    //             map(() => new fromActions.SendConfirmationCodeSuccess()),
    //             catchError(error =>
    //                 of(new fromActions.SendConfirmationCodeError(error))
    //             )
    //         )
    //     )
    // );

    // @Effect({
    //     dispatch: false,
    // })
    // sendConfirmationCodeSuccess$: Observable<
    //     fromActions.SendConfirmationCodeSuccess
    // > = this.actions$.pipe(
    //     ofType<fromActions.SendConfirmationCodeSuccess>(
    //         fromActions.AuthenticationActionTypes.SendConfirmationCodeSuccess
    //     ),
    //     tap(() =>
    //         this.snackbar.open(
    //             'Se ha enviado un nuevo código de verificación a su email',
    //             'ACEPTAR'
    //         )
    //     )
    // );

    // @Effect({
    //     dispatch: false,
    // })
    // sendConfirmationCodeError$: Observable<
    //     fromActions.SendConfirmationCodeError
    // > = this.actions$.pipe(
    //     ofType<fromActions.SendConfirmationCodeError>(
    //         fromActions.AuthenticationActionTypes.SendConfirmationCodeError
    //     ),
    //     tap(({ payload }) => {
    //         const error = payload;
    //         let message: string;

    //         if (error.code == CognitoExceptions.USER_NOT_FOUND)
    //             message = 'No existe una cuenta con ese email';
    //         else if (error.code == CognitoExceptions.INVALID_PARAMETER)
    //             message = 'Ya se encuentra confirmada esta cuenta';
    //         else message = 'Hubo un error al enviar el código de verificación';

    //         this.snackbar.open(message, 'ACEPTAR');
    //     })
    // );

    // @Effect()
    // changePassword$: Observable<
    //     fromActions.ChangePasswordSuccess | fromActions.ChangePasswordError
    // > = this.actions$.pipe(
    //     ofType(fromActions.AuthenticationActionTypes.ChangePassword),
    //     switchMap(({ payload }) =>
    //         this.authenticationService.changePassword(payload).pipe(
    //             mapTo(new fromActions.ChangePasswordSuccess()),
    //             catchError(err => of(new fromActions.ChangePasswordError(err)))
    //         )
    //     )
    // );

    // @Effect({ dispatch: false })
    // changePasswordSuccess$: Observable<
    //     fromActions.ChangePasswordSuccess
    // > = this.actions$.pipe(
    //     ofType(fromActions.AuthenticationActionTypes.ChangePasswordSuccess),
    //     tap(() => {
    //         this.snackbar.open(
    //             'Su contraseña ha sido establecida, ahora puede iniciar sesión',
    //             'OK'
    //         );
    //         this.router.navigate(['/sign-in']);
    //     })
    // );

    // @Effect({ dispatch: false })
    // changePasswordError$: Observable<
    //     fromActions.ChangePasswordError
    // > = this.actions$.pipe(
    //     ofType(fromActions.AuthenticationActionTypes.ChangePasswordError),
    //     tap(({ payload }: fromActions.ChangePasswordError) => {
    //         const error = payload;
    //         let message = 'Ha ocurrido un error, intende de nuevo más tarde.';

    //         if (error.code === CognitoExceptions.USER_NOT_FOUND)
    //             message = 'No existe una cuenta con ese email.';
    //         else if (error.code === CognitoExceptions.USER_NOT_CONFIRMED)
    //             message = 'Esta cuenta aún no ha sido confirmada.';
    //         else if (error.code === CognitoExceptions.EXPIRED_CODE)
    //             message =
    //                 'El código ha expirado, por favor, solicite uno nuevo.';

    //         this.snackbar.open(message, 'OK');
    //     })
    // );

    // @Effect()
    // completeNewPassword$: Observable<
    //     | fromActions.CompleteNewPasswordSuccess
    //     | fromActions.CompleteNewPasswordError
    // > = this.actions$.pipe(
    //     ofType<fromActions.CompleteNewPassword>(
    //         fromActions.AuthenticationActionTypes.CompleteNewPassword
    //     ),
    //     withLatestFrom(this.authenticationFacade.user$),
    //     switchMap(([{ payload }, user]) =>
    //         this.authenticationService
    //             .completeNewPassword(user, payload.password)
    //             .pipe(
    //                 map(() => new fromActions.CompleteNewPasswordSuccess()),
    //                 catchError(err => {
    //                     return of(
    //                         new fromActions.CompleteNewPasswordError(err)
    //                     );
    //                 })
    //             )
    //     )
    // );

    // @Effect({ dispatch: false })
    // completeNewPasswordSuccess$ = this.actions$.pipe(
    //     ofType(
    //         fromActions.AuthenticationActionTypes.CompleteNewPasswordSuccess
    //     ),
    //     tap(() => {
    //         this.snackbar.open(
    //             '¡Datos actualizados! Inicie sesión con su nueva contraseña',
    //             'OK'
    //         );
    //         this.router.navigate(['/sign-in']);
    //     })
    // );

    // @Effect({ dispatch: false })
    // completeNewPasswordError$ = this.actions$.pipe(
    //     ofType(fromActions.AuthenticationActionTypes.CompleteNewPasswordError),
    //     tap(() => {
    //         this.snackbar.open('Ha ocurrido un error. Intente de nuevo.', 'OK');
    //     })
    // );

    constructor(
        private actions$: Actions,
        private snackbar: MatSnackBar,
        private authenticationService: AuthenticationService,
        private router: Router,
        // private anonymousService: AnonymousService,
        private authenticationFacade: AuthenticationFacade,
        @Inject(APP_ROUTES_PROVIDER) private routes: AppRoutes,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock: boolean,
        @Inject(DOCUMENT) private document: Document
    ) {}
}
