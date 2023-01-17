import { Injectable } from '@angular/core';
import { PayerService } from '@libera/api';
import {
    LenderQuotaRequestListPaginationFilterPayload,
    LenderQuotaUpdateStatusPayload,
} from '@libera/models/lender-quota-request';
import { AuthenticationQuery } from '@libera/state';
import { Page } from '@mediomelon/ng-core';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LenderRequestsQuery } from './lender-requests.query';
import { LenderRequestsStore } from './lender-requests.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { clean } from '@libera/shared';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class LenderRequestsStoreService {
    constructor(
        private query: LenderRequestsQuery,
        private store: LenderRequestsStore,
        private payerService: PayerService,
        private authenticationQuery: AuthenticationQuery,
        private snackbar: MatSnackBar,
        private translateService: TranslateService
    ) {}

    fetchCurrentPage() {
        // const shouldFetch = this.query.shouldFetch();

        // if (!shouldFetch) return EMPTY;

        const page = this.query.getPage();
        const filters = this.query.getFilters();

        this.store.fetchPage();
        return this.fetchPage(page, filters);
    }

    changePage(page: Page) {
        const filters = this.query.getFilters();

        this.store.fetchPage(page);
        return this.fetchPage(page, filters);
    }

    changeFilters(filters: LenderQuotaRequestListPaginationFilterPayload) {
        const page = this.query.getPage();

        this.store.fetchPageWithFilters(filters);
        return this.fetchPage(page, filters);
    }

    updateQuotaRequestStatus(
        id: number,
        payload: LenderQuotaUpdateStatusPayload
    ) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();
        this.store.updateQuotaRequestStatus(id);

        return this.payerService
            .updateQuotaRequestStatus(enterpriseId, id, payload)
            .pipe(
                tap(
                    () => {
                        this.store.updateQuotaRequestStatusSuccess(id, payload);
                        const status = this.translateService
                            .instant(
                                'COMMON.LENDER_QUOTA_REQUEST_STATUS.' +
                                    payload.status
                            )
                            .toLowerCase();
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_REQUEST_NOTIFICATIONS.UPDATE_QUOTA_REQUEST_STATUS.SUCCESS',
                                { status }
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.store.updateQuotaRequestStatusError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_REQUEST_NOTIFICATIONS.UPDATE_QUOTA_REQUEST_STATUS.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    private fetchPage(
        page: Page,
        filters: LenderQuotaRequestListPaginationFilterPayload
    ) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.payerService
            .getQuotaRequest(enterpriseId, clean(filters), page)
            .pipe(
                tap(
                    response => this.store.fetchPageSuccess(response),
                    error => this.store.fetchPageError(error)
                )
            );
    }
}
