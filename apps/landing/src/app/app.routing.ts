import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthenticatedGuard } from '@libera/shared';

import { CanCompleteNewPasswordGuard } from './guards/can-complete-new-password.guard';
import { CompleteNewPasswordPageModule } from './pages/complete-new-password/complete-new-password.module';
import { CompleteNewPasswordPage } from './pages/complete-new-password/complete-new-password.page';
import { ConfirmSignInFederatedPage } from './pages/confirm-sign-in-federated/confirm-sign-in-federated.page';
import { ConfirmSignInFederatedModule } from './pages/confirm-sign-in-federated/confirm-sign-in-federated.module';
import { ConfirmSignUpModule } from './pages/confirm-sign-up/confirm-sign-up.module';
import { ConfirmSignUpPage } from './pages/confirm-sign-up/confirm-sign-up.page';
import { EmailSentPageModule } from './pages/email-sent/email-sent.module';
import { EmailSentPage } from './pages/email-sent/email-sent.page';
import { ForgotPasswordSubmitModule } from './pages/forgot-password-submit/forgot-password-submit.module';
import { ForgotPasswordSubmitPage } from './pages/forgot-password-submit/forgot-password-submit.page';
import { ForgotPasswordModule } from './pages/forgot-password/forgot-password.module';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { SignInModule } from './pages/sign-in/sign-in.module';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignUpModule } from './pages/sign-up/sign-up.module';
import { SignUpPage } from './pages/sign-up/sign-up.page';

const routes: Routes = [
    {
        path: '',
        canActivate: [NotAuthenticatedGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'sign-in',
            },
            {
                path: 'sign-in',
                component: SignInPage,
            },
            {
                path: 'sign-up',
                component: SignUpPage,
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordPage,
            },
            {
                path: 'forgot-password/email-sent',
                component: EmailSentPage,
                canActivate: [],
            },
            {
                path: 'confirm-account',
                component: ConfirmSignUpPage,
            },
            {
                path: 'reset-password',
                component: ForgotPasswordSubmitPage,
            },
            {
                path: 'complete-new-password',
                component: CompleteNewPasswordPage,
                canActivate: [CanCompleteNewPasswordGuard],
            },
            {
                path: 'confirm-account-federated',
                component: ConfirmSignInFederatedPage,
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        SignInModule,
        SignUpModule,
        ForgotPasswordModule,
        EmailSentPageModule,
        ConfirmSignUpModule,
        ForgotPasswordSubmitModule,
        CompleteNewPasswordPageModule,
        ConfirmSignInFederatedModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
