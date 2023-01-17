import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EnterpriseService } from '@libera/api';
import { EnterpriseProviderLinkConfirmation } from '@libera/models/enterprise';
import { AuthenticationQuery } from '@libera/state';
import { tap } from 'rxjs/operators';

import { LinkStore } from './link.store';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class LinkStoreService {
    constructor(
        private store: LinkStore,
        private enterpriseService: EnterpriseService,
        private authenticationQuery: AuthenticationQuery,
        private snackbar: MatSnackBar,
        private router: Router,
        private translateService: TranslateService
    ) {}

    fetch(token: string) {
        this.store.fetch();

        const id = this.authenticationQuery.getEnterpriseId();

        return this.enterpriseService
            .verifyProviderLinkToken(id, token)
            .pipe(
                tap(
                    payload => this.store.fetchSuccess(payload),
                    error => this.store.fetchError(error)
                )
            );
    }

    confirm(token: string, confirm: EnterpriseProviderLinkConfirmation) {
        this.store.confirm();

        const id = this.authenticationQuery.getEnterpriseId();

        return this.enterpriseService
            .confirmProviderLink(id, token, confirm)
            .pipe(
                tap(
                    () => {
                        const message =
                            confirm === 'ACCEPTED'
                                ? this.translateService.instant('LINK_NOTIFICATIONS.CONFIRM.ACEPTED.SUCCESS')
                                : this.translateService.instant('LINK_NOTIFICATIONS.CONFIRM.REJECTED.SUCCESS');

                        this.store.confirmSuccess();
                        this.snackbar.open(message, 'OK');
                        this.router.navigateByUrl('/core');
                    },
                    error => {
                        const message =
                            confirm === 'ACCEPTED'
                                ? this.translateService.instant('LINK_NOTIFICATIONS.CONFIRM.ACEPTED.ERROR')
                                : this.translateService.instant('LINK_NOTIFICATIONS.CONFIRM.REJECTED.ERROR');

                        this.store.confirmError(error);
                        this.snackbar.open(message, 'OK');
                    }
                )
            );
    }
}
