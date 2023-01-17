import { CognitoState } from '@libera/models/authentication';
import produce from 'immer';

import * as fromActions from '../actions/authentication.actions';

export interface AuthenticationState {
    loaded: boolean;
    signUp: {
        submitting: boolean;
        error: any;
    };
    signIn: {
        submitting: boolean;
        error: any;
    };
    signOut: {
        submitting: boolean;
        error: any;
    };
    recoverPassword: {
        submitting: boolean;
        error: any;
        email: string;
    };
    confirmSignUp: {
        submitting: boolean;
        error: any;
    };
    sendConfirmCode: {
        submitting: boolean;
        error: any;
    };
    changePassword: {
        submitting: boolean;
        error: any;
    };
    completeNewPassword: {
        submitting: boolean;
        error: any | null;
    };
    cognito: CognitoState;
}

export const authenticationState: AuthenticationState = {
    loaded: false,
    signUp: {
        submitting: false,
        error: null,
    },
    signIn: {
        submitting: false,
        error: null,
    },
    signOut: {
        submitting: false,
        error: null,
    },
    recoverPassword: {
        submitting: false,
        error: null,
        email: null,
    },
    confirmSignUp: {
        submitting: false,
        error: null,
    },
    sendConfirmCode: {
        submitting: false,
        error: null,
    },
    changePassword: {
        submitting: false,
        error: null,
    },
    completeNewPassword: {
        submitting: false,
        error: null,
    },
    cognito: null,
};

export function authenticationReducer(
    state = authenticationState,
    action: fromActions.ActionTypesUnion
) {
    return produce(state, draft => {
        switch (action.type) {
            case fromActions.AuthenticationActionTypes.LoadState:
                draft.loaded = true;
                draft.cognito = action.payload;
                return;
            // case fromActions.AuthenticationActionTypes.SignIn:
            //     draft.signIn.submitting = true;
            //     draft.signIn.error = null;
            //     return;
            // case fromActions.AuthenticationActionTypes.SignInSuccess:
            //     draft.signIn.submitting = false;
            //     return;
            // case fromActions.AuthenticationActionTypes.SignInError:
            //     draft.signIn.submitting = false;
            //     draft.signIn.error = action.payload;
            //     return;
            case fromActions.AuthenticationActionTypes.SignOut:
                draft.signOut.submitting = true;
                draft.signOut.error = null;
                return;
            case fromActions.AuthenticationActionTypes.SignOutSuccess:
                draft.signOut.submitting = false;
                return;
            case fromActions.AuthenticationActionTypes.SignOutError:
                draft.signOut.submitting = false;
                draft.signOut.error = action.payload;
                return;
            // case fromActions.AuthenticationActionTypes.SignUp:
            //     draft.signUp.submitting = true;
            //     draft.signUp.error = null;
            //     return;
            // case fromActions.AuthenticationActionTypes.SignUpSuccess:
            //     draft.signUp.submitting = false;
            //     return;
            // case fromActions.AuthenticationActionTypes.SignUpError:
            //     draft.signUp.submitting = false;
            //     draft.signUp.error = action.payload;
            //     return;
            // case fromActions.AuthenticationActionTypes.RecoverPassword:
            //     draft.recoverPassword.submitting = true;
            //     draft.recoverPassword.email = action.payload.email;
            //     return;
            // case fromActions.AuthenticationActionTypes.ResendRecoverPassword:
            //     draft.recoverPassword.submitting = true;
            //     return;
            // case fromActions.AuthenticationActionTypes.RecoverPasswordSuccess:
            //     draft.recoverPassword.submitting = false;
            //     return;
            // case fromActions.AuthenticationActionTypes.RecoverPasswordError:
            //     draft.recoverPassword.error = action.payload;
            //     draft.recoverPassword.submitting = false;
            //     return;
            // case fromActions.AuthenticationActionTypes.ConfirmSignUp:
            //     draft.confirmSignUp.submitting = true;
            //     draft.confirmSignUp.error = null;
            //     return;
            // case fromActions.AuthenticationActionTypes.ConfirmSignUpSuccess:
            //     draft.confirmSignUp.submitting = false;
            //     return;
            // case fromActions.AuthenticationActionTypes.ConfirmSignUpError:
            //     draft.confirmSignUp.submitting = false;
            //     draft.confirmSignUp.error = null;
            //     return;
            // case fromActions.AuthenticationActionTypes.SendConfirmationCode:
            //     draft.sendConfirmCode.submitting = true;
            //     draft.sendConfirmCode.error = null;
            //     return;
            // case fromActions.AuthenticationActionTypes
            //     .SendConfirmationCodeSuccess:
            //     draft.sendConfirmCode.submitting = false;
            //     return;
            // case fromActions.AuthenticationActionTypes
            //     .SendConfirmationCodeError:
            //     draft.sendConfirmCode.submitting = false;
            //     draft.sendConfirmCode.error = action.payload;
            //     return;
            // case fromActions.AuthenticationActionTypes.ChangePassword:
            //     draft.changePassword.submitting = true;
            //     return;
            // case fromActions.AuthenticationActionTypes.ChangePasswordSuccess:
            //     draft.changePassword.submitting = false;
            //     return;
            // case fromActions.AuthenticationActionTypes.ChangePasswordError:
            //     draft.changePassword.submitting = false;
            //     draft.changePassword.error = action.payload;
            //     return;
            // case fromActions.AuthenticationActionTypes.CompleteNewPassword:
            //     draft.completeNewPassword.submitting = true;
            //     draft.completeNewPassword.error = null;
            //     return;
            // case fromActions.AuthenticationActionTypes
            //     .CompleteNewPasswordSuccess:
            //     draft.completeNewPassword.submitting = false;
            //     return;
            // case fromActions.AuthenticationActionTypes.CompleteNewPasswordError:
            //     draft.completeNewPassword.error = action.payload;
            //     draft.completeNewPassword.submitting = false;
            //     return;
        }
    });
}
