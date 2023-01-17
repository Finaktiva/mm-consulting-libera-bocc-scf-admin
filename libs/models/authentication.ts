export interface CognitoState {
    state: string;
    user: any;
}

export type AuthenticationRole =
    | 'ENTERPRISE_CONSOLE_ADMIN'
    | 'ENTERPRISE_PAYER_ADMIN'
    | 'ENTERPRISE_PROVIDER_ADMIN'
    | 'ENTERPRISE_FUNDING_ADMIN';

export const AUTHENTICATION_ROLE: { [role in AuthenticationRole]: role } = {
    ENTERPRISE_CONSOLE_ADMIN: 'ENTERPRISE_CONSOLE_ADMIN',
    ENTERPRISE_FUNDING_ADMIN: 'ENTERPRISE_FUNDING_ADMIN',
    ENTERPRISE_PAYER_ADMIN: 'ENTERPRISE_PAYER_ADMIN',
    ENTERPRISE_PROVIDER_ADMIN: 'ENTERPRISE_PROVIDER_ADMIN',
};

export interface SignUpPayload {
    email: string;
    businessName: string;
    nit: string;
    password: string;
}

export interface SignInPayload {
    email: string;
    password: string;
    isHostedUI?: boolean;
}

export interface ConfirmSignUpPayload {
    email: string;
    code: string;
}

export interface ConfirmSignUpPayload {
    name: string;
    code: string;
}

export enum CognitoExceptions {
    USERNAME_EXISTS = 'UsernameExistsException',
    USER_NOT_FOUND = 'UserNotFoundException',
    USER_NOT_CONFIRMED = 'UserNotConfirmedException',
    NOT_AUTHORIZED = 'NotAuthorizedException',
    CODE_MISMATCH = 'CodeMismatchException',
    INVALID_PARAMETER = 'InvalidParameterException',
    EXPIRED_CODE = 'ExpiredCodeException',
    LAMBDA_VALIDATION = 'UserLambdaValidationException',
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ForgotPasswordSubmitPayload {
    email: string;
    password: string;
    code: string;
}

export interface ChangePasswordCredentials {
    token: string;
    code: string;
}

export type UserType = 'ENTERPRISE_USER' | 'LIBERA_USER';

export interface CompleteNewPasswordPayload {
    password: string;
}

export interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
}
