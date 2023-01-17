import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmSignUpPayload } from '@libera/models/authentication';
import { AuthenticationQuery, AuthenticationStoreService } from '@libera/state';
// import { map } from 'rxjs/operators';

@Component({
    selector: 'confirm-sign-in-federated',
    templateUrl: './confirm-sign-in-federated.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmSignInFederatedPage {
    // email$ = this.route.queryParamMap.pipe(
    //     map(queryParamMap => queryParamMap.get('email'))
    // );

    isSubmitting$ = this.query.selectConfirmingSignUp();

    // isSendingConfirmationCode$ = this.query.selectResendingSignUp();

    constructor(
        private query: AuthenticationQuery,
        private storeService: AuthenticationStoreService,
        private route: ActivatedRoute
    ) {}

    onSubmit(payload: ConfirmSignUpPayload) {
        this.storeService.confirmSignUp(payload).subscribe();
    }
}
