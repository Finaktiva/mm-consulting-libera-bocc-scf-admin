import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForgotPasswordSubmitPayload } from '@libera/models/authentication';
import { AuthenticationQuery, AuthenticationStoreService } from '@libera/state';
import { map } from 'rxjs/operators';

@Component({
    selector: 'forgot-password-submit',
    templateUrl: './forgot-password-submit.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordSubmitPage {
    isSubmitting$ = this.query.selectForgotPasswordSubmitting();

    payload$ = this.route.queryParamMap.pipe(
        map(queryParamMap => ({
            email: queryParamMap.get('email'),
            code: queryParamMap.get('code'),
        }))
    );

    constructor(
        private query: AuthenticationQuery,
        private storeService: AuthenticationStoreService,
        private route: ActivatedRoute
    ) {}

    onSubmit(payload: ForgotPasswordSubmitPayload) {
        this.storeService.forgotPasswordSubmit(payload).subscribe();
    }
}
