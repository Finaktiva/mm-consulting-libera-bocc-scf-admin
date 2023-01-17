import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignUpPayload } from '@libera/models/authentication';
import { AuthenticationQuery, AuthenticationStoreService } from '@libera/state';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPage {
    isSubmitting$ = this.query.selectSigningUp();

    constructor(
        private query: AuthenticationQuery,
        private storeService: AuthenticationStoreService
    ) {}

    onSubmit(payload: SignUpPayload) {
        this.storeService.signUp(payload).subscribe();
    }
}
