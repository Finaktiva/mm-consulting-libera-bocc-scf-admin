import { CognitoState } from '@libera/models/authentication';
import { Action } from '@ngrx/store';

export enum AuthenticationActionTypes {
    LoadState = '[Authentication] Load State',
    // SignIn = '[Authentication] Sign In',
    // SignInSuccess = '[Authentication] Sign In Success',
    // SignInError = '[Authentication] Sign In Error',
    // SignUp = '[Authentication] Sign Up',
    // SignUpSuccess = '[Authentication] Sign Up Success',
    // SignUpError = '[Authentication] Sign Up Error',
    SignOut = '[Authentication] Sign Out',
    SignOutSuccess = '[Authentication] Sign Out Success',
    SignOutError = '[Authentication] Sign Out Error',
    // RecoverPassword = '[Authentication] Recover password',
    // ResendRecoverPassword = '[Authentication] Resend recover password',
    // RecoverPasswordSuccess = '[Authentication] Recover password success',
    // RecoverPasswordError = '[Authentication] Recover password error',
    // ConfirmSignUp = '[Authentication] Confirm Sign Up',
    // ConfirmSignUpSuccess = '[Authentication] Confirm Sign Up Success',
    // ConfirmSignUpError = '[Authentication] Confirm Sign Up Error',
    // SendConfirmationCode = '[Authentication] Send Confirmtion Code',
    // SendConfirmationCodeSuccess = '[Authentication] Send Confirmtion Code Success',
    // SendConfirmationCodeError = '[Authentication] Send Confirmtion Code Error',
    // ChangePassword = '[Authentication] Change password',
    // ChangePasswordSuccess = '[Authentication] Change password success',
    // ChangePasswordError = '[Authentication] Change password error',
    // SetChangePasswordCredentials = '[Authentication] Set change password credentials',
    // CompleteNewPassword = '[Authentication] Complete New Password',
    // CompleteNewPasswordSuccess = '[Authentication] Complete New Password Success',
    // CompleteNewPasswordError = '[Authentication] Complete New Password Error',
}

export class LoadState implements Action {
    readonly type = AuthenticationActionTypes.LoadState;

    constructor(public payload: CognitoState) {}
}

// export class SignIn implements Action {
//     readonly type = AuthenticationActionTypes.SignIn;

//     constructor(public payload: SignInPayload) {}
// }

// export class SignInSuccess implements Action {
//     readonly type = AuthenticationActionTypes.SignInSuccess;
// }

// export class SignInError implements Action {
//     readonly type = AuthenticationActionTypes.SignInError;
//     constructor(public payload: any, public email: string) {}
// }

// export class SignUp implements Action {
//     readonly type = AuthenticationActionTypes.SignUp;

//     constructor(public payload: SignUpPayload) {}
// }

// export class SignUpSuccess implements Action {
//     readonly type = AuthenticationActionTypes.SignUpSuccess;

//     constructor(public payload: string) {}
// }

// export class SignUpError implements Action {
//     readonly type = AuthenticationActionTypes.SignUpError;

//     constructor(public payload: any) {}
// }

export class SignOut implements Action {
    readonly type = AuthenticationActionTypes.SignOut;
}

export class SignOutSuccess implements Action {
    readonly type = AuthenticationActionTypes.SignOutSuccess;
}

export class SignOutError implements Action {
    readonly type = AuthenticationActionTypes.SignOutError;

    constructor(public payload: any) {}
}

// export class RecoverPassword implements Action {
//     readonly type = AuthenticationActionTypes.RecoverPassword;
//     constructor(public payload: RecoverPasswordPayload) {}
// }

// export class ResendRecoverPassword implements Action {
//     readonly type = AuthenticationActionTypes.ResendRecoverPassword;
// }

// export class RecoverPasswordSuccess implements Action {
//     readonly type = AuthenticationActionTypes.RecoverPasswordSuccess;
// }

// export class RecoverPasswordError implements Action {
//     readonly type = AuthenticationActionTypes.RecoverPasswordError;
//     constructor(public payload: any) {}
// }

// export class ConfirmSignUp implements Action {
//     readonly type = AuthenticationActionTypes.ConfirmSignUp;

//     constructor(public payload: ConfirmSignUpPayload) {}
// }

// export class ConfirmSignUpSuccess implements Action {
//     readonly type = AuthenticationActionTypes.ConfirmSignUpSuccess;
// }

// export class ConfirmSignUpError implements Action {
//     readonly type = AuthenticationActionTypes.ConfirmSignUpError;

//     constructor(public payload: any) {}
// }

// export class SendConfirmationCode implements Action {
//     readonly type = AuthenticationActionTypes.SendConfirmationCode;

//     constructor(public payload: string) {}
// }

// export class SendConfirmationCodeSuccess implements Action {
//     readonly type = AuthenticationActionTypes.SendConfirmationCodeSuccess;
// }

// export class SendConfirmationCodeError implements Action {
//     readonly type = AuthenticationActionTypes.SendConfirmationCodeError;

//     constructor(public payload: any) {}
// }

// export class ChangePassword implements Action {
//     readonly type = AuthenticationActionTypes.ChangePassword;

//     constructor(public payload: ChangePasswordPayload) {}
// }

// export class ChangePasswordSuccess implements Action {
//     readonly type = AuthenticationActionTypes.ChangePasswordSuccess;
// }

// export class ChangePasswordError implements Action {
//     readonly type = AuthenticationActionTypes.ChangePasswordError;
//     constructor(public payload: any) {}
// }

// export class SetChangePasswordCredentials implements Action {
//     readonly type = AuthenticationActionTypes.SetChangePasswordCredentials;
//     constructor(public payload: ChangePasswordCredentials) {}
// }

// export class CompleteNewPassword implements Action {
//     readonly type = AuthenticationActionTypes.CompleteNewPassword;
//     constructor(public payload: CompleteNewPasswordPayload) {}
// }

// export class CompleteNewPasswordSuccess implements Action {
//     readonly type = AuthenticationActionTypes.CompleteNewPasswordSuccess;
// }

// export class CompleteNewPasswordError implements Action {
//     readonly type = AuthenticationActionTypes.CompleteNewPasswordError;
//     constructor(public payload: any) {}
// }

export type ActionTypesUnion =
    | LoadState
    // | SignIn
    // | SignInSuccess
    // | SignInError
    // | SignUp
    // | SignUpSuccess
    // | SignUpError
    | SignOut
    | SignOutSuccess
    | SignOutError;
// | RecoverPassword
// | ResendRecoverPassword
// | RecoverPasswordSuccess
// | RecoverPasswordError
// | ConfirmSignUp
// | ConfirmSignUpSuccess
// | ConfirmSignUpError
// | SendConfirmationCode
// | SendConfirmationCodeSuccess
// | SendConfirmationCodeError
// | ChangePassword
// | ChangePasswordSuccess
// | ChangePasswordError
// | SetChangePasswordCredentials
// | CompleteNewPassword
// | CompleteNewPasswordError
// | CompleteNewPasswordSuccess;
