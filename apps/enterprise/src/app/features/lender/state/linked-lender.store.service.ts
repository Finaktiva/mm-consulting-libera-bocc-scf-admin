import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PayerService } from '@libera/api';
import {
    AdjustmentRequestPayload,
    LenderOrderedListPaginationFilterPayload,
} from '@libera/models/lender';
import { AuthenticationQuery } from '@libera/state';
import { Page } from '@mediomelon/ng-core';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LinkedLenderQuery } from './linked-lender.query';
import { LinkedLenderStore } from './linked-lender.store';
import { TranslateService } from '@ngx-translate/core';
import { clean } from '@libera/shared';

@Injectable({
    providedIn: 'root',
})
export class LinkedLenderStoreService {
    constructor(
        private linkedLenderStore: LinkedLenderStore,
        private authenticationQuery: AuthenticationQuery,
        private linkedLenderQuery: LinkedLenderQuery,
        private payerService: PayerService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService
    ) {}

    fetchCurrentPage() {
        // const shouldFetch = this.linkedLenderQuery.shouldFetch();

        // if (!shouldFetch) return EMPTY;

        const page = this.linkedLenderQuery.getPage();
        const filters = this.linkedLenderQuery.getFilters();

        this.linkedLenderStore.fetchPage();
        return this.fetchPage(page, filters);
    }

    changePage(page: Page) {
        const filters = this.linkedLenderQuery.getFilters();

        this.linkedLenderStore.fetchPage(page);
        return this.fetchPage(page, filters);
    }

    changeFilters(filters: LenderOrderedListPaginationFilterPayload) {
        const page = this.linkedLenderQuery.getPage();

        this.linkedLenderStore.fetchPageWithFilters(filters);
        return this.fetchPage(page, filters);
    }

    requestQuotaAdjustment(id: number, payload: AdjustmentRequestPayload) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();
        this.linkedLenderStore.requestQuotaAdjustment(id);

        return this.payerService
            .requestQuotaAdjustment(enterpriseId, id, payload)
            .pipe(
                tap(
                    response => {
                        this.linkedLenderStore.requestQuotaAdjustmentSuccess(id);
                        this.snackbar.open(
                            this.translateService.instant(
                                'LINKED_LENDER_NOTIFICATIONS.REQUEST_QUOTA_ADJUSTMENT.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    err => {
                        this.linkedLenderStore.requestQuotaAdjustmentError(
                            id,
                            err
                        );
                        this.snackbar.open(
                            this.translateService.instant(
                                'LINKED_LENDER_NOTIFICATIONS.REQUEST_QUOTA_ADJUSTMENT.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    private fetchPage(
        page: Page,
        filters: LenderOrderedListPaginationFilterPayload
    ) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.payerService
            .fetchLinkedLenders(enterpriseId, clean(filters), page)
            .pipe(
                tap(
                    response =>
                        this.linkedLenderStore.fetchPageSuccess(response),
                    error => this.linkedLenderStore.fetchPageError(error)
                )
            );
    }
}
