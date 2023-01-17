import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ForgotPasswordPayload } from '@libera/models/authentication';
import { AuthenticationQuery, AuthenticationStoreService } from '@libera/state';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPage {
    isSendingRecoveryEmail$ = this.query.selectSendingForgotPasswordEmail();

    constructor(
        private query: AuthenticationQuery,
        private storeService: AuthenticationStoreService
    ) {}

    onSubmit(payload: ForgotPasswordPayload) {
        this.storeService.forgotPassword(payload).subscribe();
    }
}
