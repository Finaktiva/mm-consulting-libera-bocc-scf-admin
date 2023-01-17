import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationQuery, AuthenticationStoreService } from '@libera/state';

@Component({
    selector: 'email-sent',
    templateUrl: './email-sent.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailSentPage {
    isSendingEmail$ = this.query.selectSendingForgotPasswordEmail();

    constructor(
        private query: AuthenticationQuery,
        private storeService: AuthenticationStoreService,
        private route: ActivatedRoute
    ) {}

    onSubmit() {
        this.storeService
            .forgotPassword({ email: this.getEmail() })
            .subscribe();
    }

    private getEmail() {
        return this.route.snapshot.queryParamMap.get('email');
    }
}
