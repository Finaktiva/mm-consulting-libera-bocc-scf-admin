import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ChangePasswordPayload } from '@libera/models/authentication';
import { ChangePasswordFormComponent } from '@libera/shared';
import { AuthenticationQuery, AuthenticationStoreService } from '@libera/state';

@Component({
    selector: 'security-page',
    templateUrl: './security.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityPage {
    isSubmitting$ = this.query.selectChangingPassword();

    @ViewChild(ChangePasswordFormComponent, { static: false })
    component: ChangePasswordFormComponent;

    constructor(
        private query: AuthenticationQuery,
        private storeService: AuthenticationStoreService
    ) {}

    onSubmit(payload: ChangePasswordPayload) {
        this.storeService
            .changePassword(payload)
            .subscribe(() => this.component.reset());
    }
}
