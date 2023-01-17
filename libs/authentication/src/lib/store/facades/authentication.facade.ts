import { Injectable } from '@angular/core';
import {
    CompleteNewPasswordPayload,
    ConfirmSignUpPayload,
    SignInPayload,
    SignUpPayload,
} from '@libera/models/authentication';
import { select, Store } from '@ngrx/store';

import * as fromActions from '../actions/authentication.actions';
import { AuthenticationState } from '../reducers';
import {
    getEmailFromChallenge,
    getEnterpriseId,
    getIdToken,
    getRecoverPasswordEmail,
    getUser,
    getUserEmail,
    getUserState,
    getUserType,
    hasLoadedAuth,
    isChangingPassword,
    isCompletingNewPassword,
    isConfirmingSignUp,
    isLoadingAuth,
    isSendingConfirmationCode,
    isSendingRecoveryEmail,
    isSigningIn,
    isSigningOut,
    isSigningUp,
} from '../selectors/authentication.selectors';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationFacade {
    hasLoaded$ = this.store.pipe(select(hasLoadedAuth));

    isLoading$ = this.store.pipe(select(isLoadingAuth));

    isSigningUp$ = this.store.pipe(select(isSigningUp));

    isSigningOut$ = this.store.pipe(select(isSigningOut));

    isSigningIn$ = this.store.pipe(select(isSigningIn));

    isSendingRecoveryEmail$ = this.store.pipe(select(isSendingRecoveryEmail));

    isConfirmingSignUp$ = this.store.pipe(select(isConfirmingSignUp));

    isSendingConfirmationCode$ = this.store.pipe(
        select(isSendingConfirmationCode)
    );

    isChangingPassword$ = this.store.pipe(select(isChangingPassword));

    isCompletingNewPassword$ = this.store.pipe(select(isCompletingNewPassword));

    recoverPasswordEmail$ = this.store.pipe(select(getRecoverPasswordEmail));

    user$ = this.store.pipe(select(getUser));

    userState$ = this.store.pipe(select(getUserState));

    enterpriseId$ = this.store.pipe(select(getEnterpriseId));

    idToken$ = this.store.pipe(select(getIdToken));

    userType$ = this.store.pipe(select(getUserType));

    emailFromChallenge$ = this.store.pipe(select(getEmailFromChallenge));

    email$ = this.store.pipe(select(getUserEmail));

    constructor(
        private store: Store<{ authentication: AuthenticationState }>
    ) {}

    // signIn(signInPayload: SignInPayload) {
    //     this.store.dispatch(new fromActions.SignIn(signInPayload));
    // }

    signOut() {
        this.store.dispatch(new fromActions.SignOut());
    }

    // signUp(payload: SignUpPayload) {
    //     this.store.dispatch(new fromActions.SignUp(payload));
    // }

    // recoverPassword(payload: RecoverPasswordPayload) {
    //     this.store.dispatch(new fromActions.RecoverPassword(payload));
    // }

    // resendRecoverPassword() {
    //     this.store.dispatch(new fromActions.ResendRecoverPassword());
    // }

    // changePassword(payload: ChangePasswordPayload) {
    //     this.store.dispatch(new fromActions.ChangePassword(payload));
    // }

    // confirmSignUp(payload: ConfirmSignUpPayload) {
    //     this.store.dispatch(new fromActions.ConfirmSignUp(payload));
    // }

    // sendConfirmationCode(email: string) {
    //     this.store.dispatch(new fromActions.SendConfirmationCode(email));
    // }

    // completeNewPassword(payload: CompleteNewPasswordPayload) {
    //     this.store.dispatch(new fromActions.CompleteNewPassword(payload));
    // }
}
