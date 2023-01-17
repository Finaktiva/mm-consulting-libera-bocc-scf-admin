import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProviderService } from '@libera/api';
import { ProviderInvoicePaginationFiltersPayload } from '@libera/models/provider';
import { InvoiceStatus, NegotiationPayload } from '@libera/models/shared';
import { AuthenticationQuery } from '@libera/state';
import { Page } from '@mediomelon/ng-core';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { calculateDiscountValue } from '../utils';
import { InvoiceNegotiationUnionQuery } from './invoice-negotiation.union.query';
import { InvoiceNegotiationUnionStore } from './invoice-negotiation.union.store';
import { NegotiationStore } from './negotiation.store';
import { ProviderInvoiceQuery } from './provider-invoice.query';
import { ProviderInvoiceStore } from './provider-invoice.store';
import { TranslateService } from '@ngx-translate/core';
import { PaymentRequestStore } from './payment-request.store';

@Injectable({
    providedIn: 'root',
})
export class ProviderInvoiceStoreService {
    constructor(
        private store: ProviderInvoiceStore,
        private query: ProviderInvoiceQuery,
        private unionQuery: InvoiceNegotiationUnionQuery,
        private unionStore: InvoiceNegotiationUnionStore,
        private negotiationStore: NegotiationStore,
        private authenticationQuery: AuthenticationQuery,
        private providerService: ProviderService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService,
        private paymentRequestStore: PaymentRequestStore
    ) {}

    acceptLatestNegotiationOffer(invoiceId: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();
        const id = this.unionQuery.getEntityLatestNegotiationId(invoiceId);

        this.negotiationStore.acceptOffer(id);

        return this.providerService
            .updateNegotiationOffer(enterpriseId, invoiceId, id, {
                status: 'APPROVED',
            })
            .pipe(
                tap(
                    () => {
                        const status: InvoiceStatus = 'NEGOTIATION_FINISHED';
                        this.store.updateStatus(invoiceId, status);
                        this.negotiationStore.acceptOfferSuccess(id);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PROVIDER_INVOICE_NOTIFICATIONS.ACCEPT_LATEST_NEGOTIATION_OFFER.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.negotiationStore.acceptOfferError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PROVIDER_INVOICE_NOTIFICATIONS.ACCEPT_LATEST_NEGOTIATION_OFFER.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    rejectLatestNegotiationOffer(invoiceId: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();
        const id = this.unionQuery.getEntityLatestNegotiationId(invoiceId);

        this.negotiationStore.rejectOffer(id);

        return this.providerService
            .updateNegotiationOffer(enterpriseId, invoiceId, id, {
                status: 'REJECTED',
            })
            .pipe(
                tap(
                    () => {
                        const status: InvoiceStatus = 'AVAILABLE';
                        this.store.updateStatus(invoiceId, status);
                        this.negotiationStore.rejectOfferSuccess(id);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PROVIDER_INVOICE_NOTIFICATIONS.REJECT_LATEST_NEGOTIATION_OFFER.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.negotiationStore.rejectOfferError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PROVIDER_INVOICE_NOTIFICATIONS.REJECT_LATEST_NEGOTIATION_OFFER.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    editLatestNegotiationOffer(invoiceId: number) {
        const id = this.unionQuery.getEntityLatestNegotiationId(invoiceId);

        this.negotiationStore.editOffer(id);
    }

    closeLatestNegotiationOffer(invoiceId: number) {
        const id = this.unionQuery.getEntityLatestNegotiationId(invoiceId);

        this.negotiationStore.closeOffer(id);
    }

    updateLatestNegotiationOffer(
        invoiceId: number,
        payload: NegotiationPayload
    ) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();
        const id = this.unionQuery.getEntityLatestNegotiationId(invoiceId);

        this.negotiationStore.updateOffer(id);

        return this.providerService
            .updateNegotiationOffer(enterpriseId, invoiceId, id, {
                status: 'COUNTEROFFERED',
                newOffer: payload,
            })
            .pipe(
                tap(
                    () => {
                        const invoice = this.query.getEntity(invoiceId);
                        const discountValue = calculateDiscountValue(
                            invoice.payment.amount,
                            payload.discountType,
                            invoice.expirationDate,
                            invoice.emissionDate,
                            payload.percentage
                        );
                        this.negotiationStore.updateProviderOfferSuccess(id, {
                            ...payload,
                            discountValue,
                        });
                        this.snackbar.open(
                            this.translateService.instant(
                                'PROVIDER_INVOICE_NOTIFICATIONS.UPDATE_LATEST_NEGOTIATION_OFFER.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.negotiationStore.updateOfferError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PROVIDER_INVOICE_NOTIFICATIONS.UPDATE_LATEST_NEGOTIATION_OFFER.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    fetchNegotiations(id: number) {
        // const shouldFetch = this.unionQuery.shouldFetch(id);

        // if (!shouldFetch) return EMPTY;

        this.unionStore.fetchAll(id);

        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.providerService
            .getInvoiceDiscountNegotiations(enterpriseId, id)
            .pipe(
                tap(
                    payload => {
                        this.negotiationStore.insert(payload);
                        this.unionStore.fetchAllSuccess(
                            id,
                            payload.map(invoice => invoice.id)
                        );
                    },
                    error => this.unionStore.fetchAllError(id, error)
                )
            );
    }

    fetch(id: number) {
        // const shouldFetch =
        //     this.query.getUIEntityError(id) ||
        //     !this.query.getUIEntityLoaded(id);

        // if (!shouldFetch) return EMPTY;

        this.store.fetch(id);

        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.providerService
            .getInvoice(enterpriseId, id)
            .pipe(
                tap(
                    payload => this.store.fetchSuccess(id, payload),
                    error => this.store.fetchError(id, error)
                )
            );
    }

    fetchCurrentPage() {
        // const shouldFetch = this.query.getError() || !this.query.getLoaded();

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

    changeFilters(filters: ProviderInvoicePaginationFiltersPayload) {
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(page, filters);
    }

    private fetchPage(
        page: Page,
        filters: ProviderInvoicePaginationFiltersPayload
    ) {
        const id = this.authenticationQuery.getEnterpriseId();

        return this.providerService
            .getInvoicePage(id, page, filters)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }
}
