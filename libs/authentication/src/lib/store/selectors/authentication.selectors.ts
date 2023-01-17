import { UserType } from '@libera/models/authentication';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthenticationState } from '../reducers/authentication.reducer';

const getAuthenticationFeatureState = createFeatureSelector<
    AuthenticationState
>('authentication');

export const hasLoadedAuth = createSelector(
    getAuthenticationFeatureState,
    state => (state ? state.loaded : false)
);

export const isLoadingAuth = createSelector(
    hasLoadedAuth,
    state => !state
);

const getSignUpState = createSelector(
    getAuthenticationFeatureState,
    state => (state ? state.signUp : null)
);

const getSignInState = createSelector(
    getAuthenticationFeatureState,
    state => state.signIn
);

const getSignOutState = createSelector(
    getAuthenticationFeatureState,
    state => state.signOut
);

const getRecoverPasswordState = createSelector(
    getAuthenticationFeatureState,
    state => state.recoverPassword
);

const getChangePasswordState = createSelector(
    getAuthenticationFeatureState,
    state => state.changePassword
);

const getCognitoState = createSelector(
    getAuthenticationFeatureState,
    state => state.cognito
);

const getCompleteNewPasswordState = createSelector(
    getAuthenticationFeatureState,
    state => state.completeNewPassword
);

export const isSigningUp = createSelector(
    getSignUpState,
    state => (state ? state.submitting : false)
);

export const getSignUpError = createSelector(
    getSignUpState,
    state => (state ? state.error : null)
);

export const isSigningIn = createSelector(
    getSignInState,
    state => state.submitting
);

export const getSignInError = createSelector(
    getSignInState,
    state => state.error
);

export const isSigningOut = createSelector(
    getSignOutState,
    state => state.submitting
);

export const isSendingRecoveryEmail = createSelector(
    getRecoverPasswordState,
    state => state.submitting
);

export const getRecoverPasswordError = createSelector(
    getRecoverPasswordState,
    state => state.error
);

export const getRecoverPasswordEmail = createSelector(
    getRecoverPasswordState,
    state => state.email
);

const getConfirmSignUpState = createSelector(
    getAuthenticationFeatureState,
    state => (state ? state.confirmSignUp : null)
);

export const isConfirmingSignUp = createSelector(
    getConfirmSignUpState,
    state => (state ? state.submitting : false)
);

export const getConfirmSignUpError = createSelector(
    getConfirmSignUpState,
    state => (state ? state.error : false)
);

const getSendConfirmCodeState = createSelector(
    getAuthenticationFeatureState,
    state => (state ? state.sendConfirmCode : null)
);

export const isSendingConfirmationCode = createSelector(
    getSendConfirmCodeState,
    state => (state ? state.submitting : false)
);

export const getSendConfirmCodeError = createSelector(
    getSendConfirmCodeState,
    state => (state ? state.error : false)
);

export const isChangingPassword = createSelector(
    getChangePasswordState,
    state => state.submitting
);

export const getChangePasswordError = createSelector(
    getChangePasswordState,
    state => state.error
);

export const getUserState = createSelector(
    getCognitoState,
    state => (state ? state.state : null)
);

export const getUser = createSelector(
    getCognitoState,
    state => (state ? state.user : null)
);

export const getUserAttributes = createSelector(
    getUser,
    state => {
        if (!state) return null;
        if (state.attributes) return state.attributes;
        if (state.signInUserSession && state.signInUserSession.idToken)
            return state.signInUserSession.idToken.payload;
        return null;
    }
);

export const isSignedIn = createSelector(
    getUserState,
    state => state == 'signedIn'
);

export const isSignedOut = createSelector(
    getUserState,
    state => state == 'signedOut'
);

export const getUserEmail = createSelector(
    getUserAttributes,
    state => (state ? state.email : null)
);

export const getUserBusinessName = createSelector(
    getUserAttributes,
    state => (state ? state['custom:business_name'] : null)
);

export const getUserStatus = createSelector(
    getUserAttributes,
    state => (state ? state['custom:status'] : null)
);

export const getUserNit = createSelector(
    getUserAttributes,
    state => (state ? state['custom:nit'] : null)
);

export const getEnterpriseId = createSelector(
    getUserAttributes,
    state => (state ? state['custom:enterpriseId'] : null)
);

export const getUserType = createSelector(
    getUserAttributes,
    state => (state ? state['custom:userType'] : null) as UserType
);

export const getIdToken = createSelector(
    getUser,
    state =>
        state && state.signInUserSession && state.signInUserSession.idToken
            ? state.signInUserSession.idToken.jwtToken
            : null
);

const getChallengeState = createSelector(
    getUser,
    state => (state ? state.challengeParam : null)
);

const getChallengeUserAttributes = createSelector(
    getChallengeState,
    state => (state ? state.userAttributes : null)
);

export const getEmailFromChallenge = createSelector(
    getChallengeUserAttributes,
    state => (state ? state.email : null)
);

export const isCompletingNewPassword = createSelector(
    getCompleteNewPasswordState,
    state => state.submitting
);

export const getCompleteNewPasswordError = createSelector(
    getCompleteNewPasswordState,
    state => state.error
);
