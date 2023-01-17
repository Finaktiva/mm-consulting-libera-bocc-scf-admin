import { Injectable } from '@angular/core';
import {
    ConfirmSignUpPayload,
    ForgotPasswordPayload,
    ForgotPasswordSubmitPayload,
    SignInPayload,
    SignUpPayload,
} from '@libera/models/authentication';
import { AuthClass } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private auth: AuthClass;

    get authStateChange$() {
        return this.amplify.authStateChange$;
    }

    constructor(private amplify: AmplifyService) {
        this.auth = amplify.auth();
    }

    signIn({ email, password }: SignInPayload) {
        return from(this.auth.signIn(email, password));
    }

    signOut() {
        return from(this.auth.signOut());
    }

    signUp({ email, password, nit, businessName }: SignUpPayload) {
        const attributes = {
            'custom:business_name': businessName,
            'custom:nit': nit,
        };

        return from(
            this.auth.signUp({ username: email, password, attributes })
        );
    }

    forgotPassword({ email }: ForgotPasswordPayload) {
        return from(this.auth.forgotPassword(email));
    }

    confirmSignUp({ email, code }: ConfirmSignUpPayload) {
        return from(this.auth.confirmSignUp(email, code));
    }

    resendSignUp(email: string) {
        return from(this.auth.resendSignUp(email));
    }

    forgotPasswordSubmit({
        email,
        code,
        password,
    }: ForgotPasswordSubmitPayload) {
        return from(this.auth.forgotPasswordSubmit(email, code, password));
    }

    completeNewPassword(user: any, password: string) {
        return from(this.auth.completeNewPassword(user, password, {}));
    }

    changePassword(user: any, oldPassword: string, newPassword: string) {
        return from(this.auth.changePassword(user, oldPassword, newPassword));
    }

    updateToken() {
        return from(this.auth.currentAuthenticatedUser()).pipe(
            switchMap(user => {
                const currentSession = user.signInUserSession;

                return new Observable(observer => {
                    user.refreshSession(
                        currentSession.refreshToken,
                        (err, session) => {
                            if (err) observer.error(err);

                            observer.next({
                                ...user,
                                signInUserSession: session,
                            });
                        }
                    );
                });
            })
        );
    }

    federatedSignIn() {
        return from(this.auth.federatedSignIn());
    }

    checkUser() {
        return from(this.auth.currentAuthenticatedUser());
    }
}
