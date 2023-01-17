import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProviderService } from '@libera/api';
import {
    BulkInvoiceNegotiationCounterOfferPayload,
    BulkInvoiceNegotiationListPaginationFilterPayload,
} from '@libera/models/bulk-invoice-negotiation';
import { AuthenticationQuery } from '@libera/state';
import { Page } from '@mediomelon/ng-core';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';

import { ProviderBulkInvoiceNegotiationDetailStore } from './provider-bulk-invoice-negotiation-detail.store';
import { ProviderBulkInvoiceNegotiationQuery } from './provider-bulk-invoice-negotiation.query';
import { ProviderBulkInvoiceNegotiationStore } from './provider-bulk-invoice-negotiation.store';
import { SharedBulkInvoiceNegotiationStoreService } from './shared-bulk-invoice-negotiation.store.service';

@Injectable({
    providedIn: 'root',
})
export class ProviderBulkInvoiceNegotiationStoreService
    implements SharedBulkInvoiceNegotiationStoreService {
    constructor(
        private store: ProviderBulkInvoiceNegotiationStore,
        private query: ProviderBulkInvoiceNegotiationQuery,
        private detailStore: ProviderBulkInvoiceNegotiationDetailStore,
        private providerService: ProviderService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService,
        private authenticationQuery: AuthenticationQuery
    ) {}

    acceptOffer(id: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.detailStore.acceptOffer(id);

        return this.providerService
            .makeBulkNegotiationCounterOffer(enterpriseId, id, 'APPROVED')
            .pipe(
                tap(
                    () => {
                        this.detailStore.acceptOfferSuccess(id);
                        this.snackbar.open(
                            this.translateService.instant(
                                'BULK_INVOICE_NEGOTIATION_NOTIFICATIONS.ACCEPT_OFFER.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.detailStore.acceptOfferError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'BULK_INVOICE_NEGOTIATION_NOTIFICATIONS.ACCEPT_OFFER.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    makeCounterOffer(
        id: number,
        payload: BulkInvoiceNegotiationCounterOfferPayload
    ) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.detailStore.makeCounterOffer(id);

        return this.providerService
            .makeBulkNegotiationCounterOffer(
                enterpriseId,
                id,
                'COUNTEROFFERED',
                payload
            )
            .pipe(
                tap(
                    () => {
                        this.detailStore.makeCounterOfferSuccess(id, payload);
                        this.snackbar.open(
                            this.translateService.instant(
                                'BULK_INVOICE_NEGOTIATION_NOTIFICATIONS.COUNTER_OFFER.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.detailStore.makeCounterOfferError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'BULK_INVOICE_NEGOTIATION_NOTIFICATIONS.COUNTER_OFFER.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    rejectOffer(id: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.detailStore.rejectOffer(id);

        return this.providerService
            .makeBulkNegotiationCounterOffer(enterpriseId, id, 'REJECTED')
            .pipe(
                tap(
                    () => {
                        this.detailStore.rejectOfferSuccess(id);
                        this.snackbar.open(
                            this.translateService.instant(
                                'BULK_INVOICE_NEGOTIATION_NOTIFICATIONS.REJECT_OFFER.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.detailStore.rejectOfferError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'BULK_INVOICE_NEGOTIATION_NOTIFICATIONS.REJECT_OFFER.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    fetch(id: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.detailStore.fetch(id);

        return this.providerService
            .fetchBulkNegotiation(enterpriseId, id)
            .pipe(
                tap(
                    payload => this.detailStore.fetchSuccess(id, payload),
                    error => this.detailStore.fetchError(id, error)
                )
            );
    }

    fetchCurrentPage() {
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

    changeFilters(filters: BulkInvoiceNegotiationListPaginationFilterPayload) {
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(page, filters);
    }

    private fetchPage(
        page: Page,
        filters: BulkInvoiceNegotiationListPaginationFilterPayload
    ) {
        const id = this.authenticationQuery.getEnterpriseId();

        return this.providerService
            .fetchBulkNegotiationPage(id, page, filters)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }
}
