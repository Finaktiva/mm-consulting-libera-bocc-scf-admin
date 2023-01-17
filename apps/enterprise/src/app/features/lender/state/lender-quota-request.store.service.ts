import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LenderService, PayerService } from '@libera/api';
import {
    LenderQuotaRequestListPaginationFilterPayload,
    LenderQuotaRequestPayload,
    QuotaRequest,
} from '@libera/models/lender-quota-request';
import { AuthenticationQuery } from '@libera/state';
import { Page } from '@mediomelon/ng-core';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LenderQuotaRequestQuery } from './lender-quota-request.query';
import { LenderQuotaRequestStore } from './lender-quota-request.store';
import { LenderInvoiceRequestStore } from './lender-invoice-request.store';
import { LenderStore } from './lender.store';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class LenderQuotaRequestStoreService {
    constructor(
        private store: LenderQuotaRequestStore,
        private query: LenderQuotaRequestQuery,
        private lenderService: LenderService,
        private payerService: PayerService,
        private authenticationQuery: AuthenticationQuery,
        private snackbar: MatSnackBar,
        private lenderStore: LenderStore,
        private translateService: TranslateService
    ) {}

    toggleExpansion(id: number) {
        this.store.toggle(id);
    }

    reject(id: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.store.reject(id);

        return this.lenderService
            .changeQuotaRequestStatus(enterpriseId, id, 'REJECTED')
            .pipe(
                tap(
                    () => {
                        this.store.rejectSuccess(id);
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_QUOTA_REQUEST_NOTIFICATIONS.REJECT.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.store.rejectError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_QUOTA_REQUEST_NOTIFICATIONS.REJECT.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    approve(id: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.store.approve(id);

        return this.lenderService
            .changeQuotaRequestStatus(enterpriseId, id, 'APPROVED')
            .pipe(
                tap(
                    () => {
                        this.store.approveSuccess(id);
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_QUOTA_REQUEST_NOTIFICATIONS.APPROVE.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.store.approveError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_QUOTA_REQUEST_NOTIFICATIONS.APPROVE.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    update(id: number, payload: LenderQuotaRequestPayload) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.store.update(id);

        return this.lenderService
            .updateQuotaRequest(enterpriseId, id, payload)
            .pipe(
                tap(
                    response => {
                        this.store.updateSuccess(id, payload);
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_QUOTA_REQUEST_NOTIFICATIONS.UPDATE.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.store.updateError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_QUOTA_REQUEST_NOTIFICATIONS.UPDATE.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

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
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(page, filters);
    }

    private fetchPage(
        page: Page,
        filters: LenderQuotaRequestListPaginationFilterPayload
    ) {
        const id = this.authenticationQuery.getEnterpriseId();

        return this.lenderService
            .getQuotaRequestPage(id, page, filters)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }

    createQuotaRequest(id: number, payload: QuotaRequest) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();
        this.store.quotaRequest(id);

        return this.payerService
            .createQuotaRequest(enterpriseId, id, payload)
            .pipe(
                tap(
                    response => {
                        this.store.quotaRequestSuccess(id);
                        this.lenderStore.remove(id);
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_QUOTA_REQUEST_NOTIFICATIONS.CREATE_QUOTA_REQUEST.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.store.quotaRequestError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_QUOTA_REQUEST_NOTIFICATIONS.CREATE_QUOTA_REQUEST.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }
}
