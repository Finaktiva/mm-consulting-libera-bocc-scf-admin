import { Injectable } from '@angular/core';
import { CognitoState } from '@libera/models/authentication';
import { SubmitStoreState } from '@mediomelon/ng-core';
import { AmplifyService } from 'aws-amplify-angular';
import produce from 'immer';
import { BehaviorSubject, Observable } from 'rxjs';

interface AuthenticationState {
    loaded: boolean;
    changePassword: SubmitStoreState;
    signUp: SubmitStoreState;
    signIn: SubmitStoreState;
    signOut: SubmitStoreState;
    forgotPassword: SubmitStoreState;
    forgotPasswordSubmit: SubmitStoreState;
    confirmSignUp: SubmitStoreState;
    resendSignUp: SubmitStoreState;
    completeNewPassword: SubmitStoreState;
    cognito: CognitoState;
}

const submitState: SubmitStoreState = {
    submitting: false,
    error: null,
};

const initialState: AuthenticationState = {
    loaded: false,
    changePassword: submitState,
    completeNewPassword: submitState,
    confirmSignUp: submitState,
    forgotPassword: submitState,
    forgotPasswordSubmit: submitState,
    resendSignUp: submitState,
    signIn: submitState,
    signOut: submitState,
    signUp: submitState,
    cognito: null,
};

@Injectable({
    providedIn: 'root',
})
export class AuthenticationStore {
    private _state$ = new BehaviorSubject(initialState);

    state$: Observable<AuthenticationState> = this._state$.asObservable();

    constructor(private amplify: AmplifyService) {
        this.amplify.authStateChange$.subscribe(state => {
            this.loadState(state);
        });
    }

    signIn() {
        this.submit('signIn');
    }

    signInSuccess() {
        this.submitSuccess('signIn');
    }

    signInError(payload: any) {
        this.submitError('signIn', payload);
    }

    signUp() {
        this.submit('signUp');
    }

    signUpSuccess() {
        this.submitSuccess('signUp');
    }

    signUpError(payload: any) {
        this.submitError('signUp', payload);
    }

    signOut() {
        this.submit('signOut');
    }

    signOutSuccess() {
        this.submitSuccess('signOut');
    }

    signOutError(payload: any) {
        this.submitError('signOut', payload);
    }

    forgotPassword() {
        this.submit('forgotPassword');
    }

    forgotPasswordSuccess() {
        this.submitSuccess('forgotPassword');
    }

    forgotPasswordError(payload: any) {
        this.submitError('forgotPassword', payload);
    }

    confirmSignUp() {
        this.submit('confirmSignUp');
    }

    confirmSignUpSuccess() {
        this.submitSuccess('confirmSignUp');
    }

    confirmSignUpError(payload: any) {
        this.submitError('confirmSignUp', payload);
    }

    resendSignUp() {
        this.submit('resendSignUp');
    }

    resendSignUpSuccess() {
        this.submitSuccess('resendSignUp');
    }

    resendSignUpError(payload: any) {
        this.submitError('resendSignUp', payload);
    }

    forgotPasswordSubmit() {
        this.submit('forgotPasswordSubmit');
    }

    forgotPasswordSubmitSuccess() {
        this.submitSuccess('forgotPasswordSubmit');
    }

    forgotPasswordSubmitError(payload: any) {
        this.submitError('forgotPasswordSubmit', payload);
    }

    completeNewPassword() {
        this.submit('completeNewPassword');
    }

    completeNewPasswordSuccess() {
        this.submitSuccess('completeNewPassword');
    }

    completeNewPasswordError(payload: any) {
        this.submitError('completeNewPassword', payload);
    }

    changePassword() {
        this.submit('changePassword');
    }

    changePasswordSuccess() {
        this.submitSuccess('changePassword');
    }

    changePasswordError(payload: any) {
        this.submitError('changePassword', payload);
    }

    getState() {
        return this._state$.getValue();
    }

    setAuthState(user: any) {
        const state = this.getState().cognito.state;
        this.amplify.setAuthState({ state, user });
    }

    setUser(payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.loaded = true;
            draft.cognito.user = payload;
        });

        this.setState(newState);
    }

    private submit(key: keyof AuthenticationState) {
        if (key == 'loaded' || key == 'cognito') return;

        const state = this.getState();

        const newState = produce(state, draft => {
            draft[key].submitting = true;
            draft[key].error = null;
        });

        this.setState(newState);
    }

    private submitSuccess(key: keyof AuthenticationState) {
        if (key == 'loaded' || key == 'cognito') return;

        const state = this.getState();

        const newState = produce(state, draft => {
            draft[key].submitting = false;
        });

        this.setState(newState);
    }

    private submitError(key: keyof AuthenticationState, payload: any) {
        if (key == 'loaded' || key == 'cognito') return;

        const state = this.getState();

        const newState = produce(state, draft => {
            draft[key].submitting = false;
            draft[key].error = payload;
        });

        this.setState(newState);
    }

    private loadState(cognito: CognitoState) {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.loaded = true;
            draft.cognito = cognito;
        });

        this.setState(newState);
    }

    private setState(state: AuthenticationState) {
        this._state$.next(state);
    }
}
