import { Injectable } from '@angular/core';
import { AuthenticationRole, UserType } from '@libera/models/authentication';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { AuthenticationStore } from './authentication.store';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationQuery {
    constructor(private store: AuthenticationStore) {}

    selectLoaded(): Observable<boolean> {
        return this.store.state$.pipe(select(state => state.loaded));
    }

    selectUserRoles(): Observable<AuthenticationRole[]> {
        return this.selectUserAttributes().pipe(
            select(attributes =>
                attributes ? JSON.parse(attributes['custom:roles']) : []
            )
        );
    }

    selectUserType(): Observable<UserType> {
        return this.selectUserAttributes().pipe(
            select(attributes =>
                attributes ? attributes['custom:userType'] : null
            )
        );
    }

    selectEmail(): Observable<string> {
        return this.selectUserAttributes().pipe(
            select(attributes => (attributes ? attributes.email : null))
        );
    }

    selectUserAttributes() {
        return this.selectUser().pipe(
            select(user => this.pickUserAttributes(user))
        );
    }

    selectUser(): Observable<any> {
        return this.selectCognitoState().pipe(
            select(cognito => (cognito ? cognito.user : null))
        );
    }

    selectUserState(): Observable<string> {
        return this.selectCognitoState().pipe(
            select(cognito => (cognito ? cognito.state : null))
        );
    }

    selectForgotPasswordSubmitting(): Observable<boolean> {
        return this.selectForgotPasswordSubmitState().pipe(
            select(state => state.submitting)
        );
    }

    selectForgotPasswordSubmitError(): Observable<any> {
        return this.selectForgotPasswordSubmitState().pipe(
            select(state => state.error)
        );
    }

    selectCompletingNewPassword(): Observable<boolean> {
        return this.selectCompleteNewPasswordState().pipe(
            select(state => state.submitting)
        );
    }

    selectCompleteNewPasswordError(): Observable<any> {
        return this.selectCompleteNewPasswordState().pipe(
            select(state => state.error)
        );
    }

    selectConfirmingSignUp(): Observable<boolean> {
        return this.selectConfirmSignUpState().pipe(
            select(state => state.submitting)
        );
    }

    selectConfirmSignUpError(): Observable<any> {
        return this.selectConfirmSignUpState().pipe(
            select(state => state.error)
        );
    }

    selectSendingForgotPasswordEmail(): Observable<boolean> {
        return this.selectForgotPasswordState().pipe(
            select(state => state.submitting)
        );
    }

    selectForgotPasswordError(): Observable<any> {
        return this.selectForgotPasswordState().pipe(
            select(state => state.error)
        );
    }

    selectResendingSignUp(): Observable<boolean> {
        return this.selectResendSignUpState().pipe(
            select(state => state.submitting)
        );
    }

    selectResendSignUpError(): Observable<any> {
        return this.selectResendSignUpState().pipe(
            select(state => state.error)
        );
    }

    selectSigningIn(): Observable<boolean> {
        return this.selectSignInState().pipe(select(state => state.submitting));
    }

    selectSignInError(): Observable<any> {
        return this.selectSignInState().pipe(select(state => state.error));
    }

    selectSigningOut(): Observable<boolean> {
        return this.selectSignOutState().pipe(
            select(state => state.submitting)
        );
    }

    selectSignOutError(): Observable<any> {
        return this.selectSignOutState().pipe(select(state => state.error));
    }

    selectSigningUp(): Observable<boolean> {
        return this.selectSignUpState().pipe(select(state => state.submitting));
    }

    selectSignUpError(): Observable<any> {
        return this.selectSignUpState().pipe(select(state => state.error));
    }

    selectChangingPassword(): Observable<boolean> {
        return this.selectChangePasswordState().pipe(
            select(state => state.submitting)
        );
    }

    getEnterpriseId(): number {
        const state = this.getUserAttributes();
        return state ? state['custom:enterpriseId'] : null;
    }

    getUserAttributes() {
        const state = this.getUser();

        return this.pickUserAttributes(state);
    }

    getUser() {
        const state = this.getCognitoState();
        return state ? state.user : null;
    }

    getUserState() {
        const state = this.getCognitoState();
        return state ? state.state : null;
    }

    private pickUserAttributes(state) {
        if (!state) return null;
        if (state.attributes) return state.attributes;
        if (state.signInUserSession && state.signInUserSession.idToken)
            return state.signInUserSession.idToken.payload;
        return null;
    }

    private getCognitoState() {
        return this.store.getState().cognito;
    }

    private selectCognitoState() {
        return this.store.state$.pipe(select(state => state.cognito));
    }

    private selectForgotPasswordSubmitState() {
        return this.store.state$.pipe(
            select(state => state.forgotPasswordSubmit)
        );
    }

    private selectCompleteNewPasswordState() {
        return this.store.state$.pipe(
            select(state => state.completeNewPassword)
        );
    }

    private selectConfirmSignUpState() {
        return this.store.state$.pipe(select(state => state.confirmSignUp));
    }

    private selectForgotPasswordState() {
        return this.store.state$.pipe(select(state => state.forgotPassword));
    }

    private selectResendSignUpState() {
        return this.store.state$.pipe(select(state => state.resendSignUp));
    }

    private selectSignInState() {
        return this.store.state$.pipe(select(state => state.signIn));
    }

    private selectSignOutState() {
        return this.store.state$.pipe(select(state => state.signOut));
    }

    private selectSignUpState() {
        return this.store.state$.pipe(select(state => state.signUp));
    }

    private selectChangePasswordState() {
        return this.store.state$.pipe(select(state => state.changePassword));
    }
}
