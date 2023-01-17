import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '@libera/api';
import { AppRoutes, APP_ROUTES_PROVIDER } from '@libera/environment';
import {
    ChangePasswordPayload,
    CognitoExceptions,
    CompleteNewPasswordPayload,
    ConfirmSignUpPayload,
    ForgotPasswordPayload,
    ForgotPasswordSubmitPayload,
    SignInPayload,
    SignUpPayload,
} from '@libera/models/authentication';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, interval, Subscription } from 'rxjs';
import {
    catchError,
    filter,
    map,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs/operators';
import { AuthenticationQuery } from './authentication.query';
import { AuthenticationStore } from './authentication.store';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationStoreService implements OnDestroy {
    private subscriptions: Subscription;

    constructor(
        private query: AuthenticationQuery,
        private authenticationService: AuthenticationService,
        private store: AuthenticationStore,
        private snackbar: MatSnackBar,
        private router: Router,
        @Inject(APP_ROUTES_PROVIDER) private routes: AppRoutes,
        @Inject(DOCUMENT) private document: Document,
        private translateService: TranslateService
    ) {
        this.subscriptions = this.updateToken$.subscribe();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    signUp(payload: SignUpPayload) {
        this.store.signUp();

        return this.authenticationService.signUp(payload).pipe(
            tap(
                () => {
                    this.store.signUpSuccess();
                    this.snackbar.open(
                        this.translateService.instant(
                            'AUTHENTICATION.VERIFICATION_CODE'
                        ),
                        this.translateService
                            .instant('COMMON.ACTIONS.ACCEPT')
                            .toUpperCase()
                    );
                    this.router.navigate(['confirm-account'], {
                        queryParams: { email: payload.email },
                    });
                },
                error => {
                    this.store.signUpError(error);

                    const errorCode = error && error.code;
                    let message: string;

                    if (errorCode == CognitoExceptions.USERNAME_EXISTS)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.REGISTERED_ACCOUNT'
                        );
                    if (
                        errorCode == CognitoExceptions.LAMBDA_VALIDATION &&
                        (error.message as string).includes(payload.nit)
                    )
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.REGISTERED_NIT'
                        );
                    else
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.CREATE_ACCOUNT'
                        );

                    this.snackbar.open(
                        message,
                        this.translateService
                            .instant('COMMON.ACTIONS.ACCEPT')
                            .toUpperCase()
                    );
                }
            )
        );
    }

    confirmSignUp(payload: ConfirmSignUpPayload) {
        this.store.confirmSignUp();

        return this.authenticationService.confirmSignUp(payload).pipe(
            tap(
                () => {
                    this.store.confirmSignUpSuccess();

                    this.snackbar.open(
                        this.translateService.instant(
                            'AUTHENTICATION.CONFIRMED_ACCOUNT'
                        ),
                        this.translateService
                            .instant('COMMON.ACTIONS.ACCEPT')
                            .toUpperCase()
                    );
                    this.router.navigateByUrl('/sign-in');
                },
                error => {
                    this.store.confirmSignUpError(error);

                    const errorCode = error && error.code;
                    let message: string;

                    if (errorCode == CognitoExceptions.NOT_AUTHORIZED)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.CONFIRMED_ACCOUNT'
                        );
                    else if (errorCode == CognitoExceptions.USER_NOT_FOUND)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.WITHOUT_EMAIL'
                        );
                    else if (errorCode == CognitoExceptions.CODE_MISMATCH)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.INCORRECT_CODE'
                        );
                    else
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.ERROR_CONFIRM_ACCOUNT'
                        );
                    this.snackbar.open(
                        message,
                        this.translateService
                            .instant('COMMON.ACTIONS.ACCEPT')
                            .toUpperCase()
                    );
                }
            )
        );
    }

    signIn(payload: SignInPayload) {
        this.store.signIn();
        if (payload.isHostedUI) {
            return this.authenticationService.federatedSignIn().pipe(withLatestFrom(), tap(() => {},
            error => {
                this.store.signInError(error);
                this.snackbar.open(this.translateService.instant(
                    'AUTHENTICATION.ERRORS.LOGIN'
                ), 'OK');
            }));
        }
        return this.authenticationService.signIn(payload).pipe(
            withLatestFrom(
                this.query.selectUserType(),
                this.query.selectUserState()
            ),
            tap(
                ([, userType, userState]) => {
                        this.store.signInSuccess();

                        if (userState === 'requireNewPassword')
                            return this.router.navigate(
                                ['/complete-new-password'],
                                { queryParams: { email: payload.email } }
                            );

                        let route = this.router.routerState.root;

                        while (route.firstChild) route = route.firstChild;

                        const redirect = route.snapshot.queryParamMap.get(
                            'redirect'
                        );

                        if (redirect)
                            return this.document.location.assign(
                                decodeURIComponent(redirect)
                            );

                        if (userType == 'ENTERPRISE_USER') {
                            return this.document.location.assign(
                                this.routes.enterprise
                            );
                        }

                        if (userType == 'LIBERA_USER')
                            return this.document.location.assign(this.routes.admin);

                        return this.snackbar.open(
                            this.translateService.instant(
                                'AUTHENTICATION.ERRORS.WITHOUT_TYPE_USER'
                            ),
                            'OK'
                        );
                },
                error => {
                    this.store.signInError(error);

                    const errorCode = error && error.code;
                    const errorMessage = error && error.message;

                    let message = this.translateService.instant(
                        'AUTHENTICATION.ERRORS.LOGIN'
                    );

                    if (errorCode === CognitoExceptions.NOT_AUTHORIZED) {
                        switch (errorMessage) {
                            case 'Incorrect username or password.':
                                message = this.translateService.instant(
                                    'AUTHENTICATION.ERRORS.INCORRECT_USER_OR_PASSWORD'
                                );
                                break;
                            case 'User is disabled.':
                                message = this.translateService.instant(
                                    'AUTHENTICATION.ERRORS.USER_DISABLED'
                                );
                                break;
                        }
                    }

                    if (errorCode === CognitoExceptions.USER_NOT_FOUND)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.WITHOUT_EMAIL'
                        );

                    if (errorCode === CognitoExceptions.USER_NOT_CONFIRMED) {
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.VERIFY_ACCOUNT'
                        );
                        this.router.navigate(['/confirm-account'], {
                            queryParams: { email: payload.email },
                        });
                    }

                    this.snackbar.open(message, 'OK');
                }
            )
        );
    }

    signOut(sessionExpired?: boolean) {
        this.store.signOut();

        return this.authenticationService.signOut().pipe(
            tap(
                () => {
                    this.store.signOutSuccess();
                    this.document.location.assign(this.routes.landing + (sessionExpired ? '?disconnection=session_expired': ''));
                },
                error => {
                    this.store.signOutError(error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'AUTHENTICATION.ERRORS.ERROR_LOGOUT'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    forgotPassword(payload: ForgotPasswordPayload) {
        this.store.forgotPassword();

        return this.authenticationService.forgotPassword(payload).pipe(
            tap(
                () => {
                    this.store.forgotPasswordSuccess();

                    this.snackbar.open(
                        this.translateService.instant(
                            'AUTHENTICATION.SEND_EMAIL'
                        ),
                        'OK'
                    );
                    this.router.navigate(['/forgot-password/email-sent'], {
                        queryParams: {
                            email: payload.email,
                        },
                    });
                },
                error => {
                    this.store.forgotPasswordError(error);

                    const errorCode = error && error.code;
                    let message = this.translateService.instant(
                        'AUTHENTICATION.ERRORS.ERROR_SEND_EMAIL'
                    );

                    if (errorCode === CognitoExceptions.USER_NOT_FOUND)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.EMAIL_NOT_FOUND'
                        );
                    else if (errorCode === CognitoExceptions.USER_NOT_CONFIRMED)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.USER_NOT_VERIFY'
                        );
                    else if (errorCode === CognitoExceptions.INVALID_PARAMETER)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.ACCOUNT_NOT_VERIFIED'
                        );

                    this.snackbar.open(message, 'OK');
                }
            )
        );
    }

    forgotPasswordSubmit(payload: ForgotPasswordSubmitPayload) {
        this.store.forgotPasswordSubmit();

        return this.authenticationService.forgotPasswordSubmit(payload).pipe(
            tap(
                () => {
                    this.store.forgotPasswordSubmit();

                    this.snackbar.open(
                        this.translateService.instant(
                            'AUTHENTICATION.RESET_PASSWORD'
                        ),
                        'OK'
                    );
                    this.router.navigate(['/sign-in']);
                },
                error => {
                    this.store.forgotPasswordSubmitError(error);

                    const errorCode = error && error.code;
                    let message = this.translateService.instant(
                        'AUTHENTICATION.ERRORS.TRY_LATER'
                    );

                    if (errorCode === CognitoExceptions.USER_NOT_FOUND)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.WITHOUT_EMAIL'
                        );
                    else if (errorCode === CognitoExceptions.USER_NOT_CONFIRMED)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.CONFIRM_ACCOUNT'
                        );
                    else if (errorCode === CognitoExceptions.EXPIRED_CODE)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.EXPIRED_CODE'
                        );
                    else if (errorCode === CognitoExceptions.CODE_MISMATCH)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.INVALID_CODE'
                        );

                    this.snackbar.open(message, 'OK');
                }
            )
        );
    }

    resendSignUp(email: string) {
        this.store.resendSignUp();

        return this.authenticationService.resendSignUp(email).pipe(
            tap(
                () => {
                    this.store.resendSignUpSuccess();

                    this.snackbar.open(
                        this.translateService.instant(
                            'AUTHENTICATION.SEND_CODE'
                        ),
                        this.translateService
                            .instant('COMMON.ACTIONS.ACCEPT')
                            .toUpperCase()
                    );
                },
                error => {
                    this.store.resendSignUpError(error);

                    const errorCode = error && error.code;
                    let message: string;

                    if (errorCode == CognitoExceptions.USER_NOT_FOUND)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.WITHOUT_EMAIL'
                        );
                    else if (errorCode == CognitoExceptions.INVALID_PARAMETER)
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.ALREADY_ACCOUNT_CONFIRM'
                        );
                    else
                        message = this.translateService.instant(
                            'AUTHENTICATION.ERRORS.SEND_CODE'
                        );

                    this.snackbar.open(
                        message,
                        this.translateService
                            .instant('COMMON.ACTIONS.ACCEPT')
                            .toUpperCase()
                    );
                }
            )
        );
    }

    completeNewPassword(payload: CompleteNewPasswordPayload) {
        this.store.completeNewPassword();

        const user = this.query.getUser();

        return this.authenticationService
            .completeNewPassword(user, payload.password)
            .pipe(
                tap(
                    () => {
                        this.store.completeNewPasswordSuccess();

                        this.snackbar.open(
                            this.translateService.instant(
                                'AUTHENTICATION.CONFIRMED_ACCOUNT'
                            ),
                            'OK'
                        );

                        this.signOut().subscribe();
                    },
                    error => {
                        this.store.completeNewPasswordError(error);

                        this.snackbar.open(
                            this.translateService.instant(
                                'AUTHENTICATION.ERRORS.TRY_AGAIN'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    changePassword({ oldPassword, newPassword }: ChangePasswordPayload) {
        const user = this.query.getUser();

        if (!user) {
            this.snackbar.open(
                this.translateService.instant(
                    'AUTHENTICATION.ERRORS.NO_LOGGED_IN'
                )
            );
            return EMPTY;
        }

        this.store.changePassword();

        return this.authenticationService
            .changePassword(user, oldPassword, newPassword)
            .pipe(
                tap(
                    () => {
                        this.store.changePasswordSuccess();
                        this.snackbar.open(
                            this.translateService.instant(
                                'AUTHENTICATION.SUCCESS_PASSWORD_UPDATE'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.store.changePasswordError(error);

                        const errorCode = error && error.code;

                        let message: string;

                        if (errorCode == CognitoExceptions.NOT_AUTHORIZED)
                            message = this.translateService.instant(
                                'AUTHENTICATION.ERRORS.INCORRECT_PASSWORD'
                            );
                        else
                            message = this.translateService.instant(
                                'AUTHENTICATION.ERRORS.ERROR_PASSWORD_UPDATE'
                            );

                        this.snackbar.open(
                            message,
                            this.translateService
                                .instant('COMMON.ACTIONS.ACCEPT')
                                .toUpperCase()
                        );
                    }
                )
            );
    }

    private updateToken$ = interval(600000).pipe(
        filter(() => this.query.getUserState() === 'signedIn'),
        switchMap(() => {
            return this.authenticationService.updateToken().pipe(
                map(user => {
                    this.store.setAuthState(user);
                }),
                catchError(() => {
                    return this.signOut();
                })
            );
        })
    );

    validateFederatedSignIn(isSuccess: boolean) {
        if (isSuccess) {
            return this.authenticationService.checkUser().pipe(
                tap(user => {
                    this.store.setUser(user);
                }),
                withLatestFrom(
                    this.query.selectUserType()
                ), tap(([, userType]) => {
                    this.store.signInSuccess();
                    let route = this.router.routerState.root;

                    while (route.firstChild) route = route.firstChild;

                    const redirect = route.snapshot.queryParamMap.get(
                        'redirect'
                    );

                    if (redirect)
                        return this.document.location.assign(
                            decodeURIComponent(redirect)
                        );

                    if (userType == 'ENTERPRISE_USER') {
                        return this.document.location.assign(
                            this.routes.enterprise
                        );
                    }

                    if (userType == 'LIBERA_USER')
                        return this.document.location.assign(this.routes.admin);

                    return this.snackbar.open(
                        this.translateService.instant(
                            'AUTHENTICATION.ERRORS.WITHOUT_TYPE_USER'
                        ),
                        'OK'
                    );

                },
                error => {
                    this.store.signInError(error);
                    this.snackbar.open(this.translateService.instant(
                        'AUTHENTICATION.ERRORS.LOGIN'
                    ), 'OK');
                })
            );
        } else {
            this.store.signInError('');
            this.snackbar.open(this.translateService.instant(
                'AUTHENTICATION.ERRORS.LOGIN'
            ), 'OK');
        }
    }
}


