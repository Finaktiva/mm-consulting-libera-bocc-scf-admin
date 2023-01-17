import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PayerService } from '@libera/api';
import {
    PayerInvoicePaginationFiltersPayload,
    PayerInvoicePayload,
} from '@libera/models/payer';
import { InvoiceStatus, NegotiationPayload } from '@libera/models/shared';
import { AuthenticationQuery } from '@libera/state';
import { Page } from '@mediomelon/ng-core';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { calculateDiscountValue } from '../utils';
import { CreateInvoiceStore } from './create-invoice.store';
import { FundingRequestLogUnionStore } from './funding-request-log.union.store';
import { FundingRequestStore } from './funding-request.store';
import { InvoiceFundingRequestUnionStore } from './invoice-funding-request.union.store';
import { InvoiceNegotiationUnionQuery } from './invoice-negotiation.union.query';
import { InvoiceNegotiationUnionStore } from './invoice-negotiation.union.store';
import { NegotiationLogUnionStore } from './negotiation-log.union.store';
import { NegotiationStore } from './negotiation.store';
import { PayerInvoiceQuery } from './payer-invoice.query';
import { PayerInvoiceStore } from './payer-invoice.store';

@Injectable({
    providedIn: 'root',
})
export class PayerInvoiceStoreService {
    constructor(
        private store: PayerInvoiceStore,
        private query: PayerInvoiceQuery,
        private createStore: CreateInvoiceStore,
        private unionQuery: InvoiceNegotiationUnionQuery,
        private unionStore: InvoiceNegotiationUnionStore,
        private negotiationStore: NegotiationStore,
        private negotiationLogUnionStore: NegotiationLogUnionStore,
        private payerService: PayerService,
        private authenticationQuery: AuthenticationQuery,
        private snackbar: MatSnackBar,
        private invoiceFundingRequestUnionStore: InvoiceFundingRequestUnionStore,
        private fundingRequestStore: FundingRequestStore,
        private fundingRequestLogUnionStore: FundingRequestLogUnionStore,
        private translateService: TranslateService
    ) {}

    fetchNegotiationLogs(id: number, invoiceId: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.negotiationLogUnionStore.fetch(id);

        // const shouldFetch = this.negotiationLogUnionQuery.shouldFetchEntity(id);

        // if (!shouldFetch) return EMPTY;

        this.negotiationLogUnionStore.fetch(id);

        return this.payerService
            .fetchNegotiationLogs(enterpriseId, invoiceId, id)
            .pipe(
                tap(
                    payload =>
                        this.negotiationLogUnionStore.fetchSuccess(id, payload),
                    error => this.negotiationLogUnionStore.fetchError(id, error)
                )
            );
    }

    cancelCurrentNegotiation(invoiceId: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();
        const id = this.unionQuery.getEntityLatestNegotiationId(invoiceId);
        this.negotiationStore.cancel(id);

        return this.payerService
            .cancelNegotiation(enterpriseId, invoiceId, id)
            .pipe(
                tap(
                    () => {
                        const status: InvoiceStatus = 'AVAILABLE';
                        this.store.updateStatus(invoiceId, status);
                        this.negotiationStore.cancelSuccess(id);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.CANCEL_CURRENT_NEGOTIATION.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.negotiationStore.cancelError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.CANCEL_CURRENT_NEGOTIATION.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    acceptLatestNegotiationOffer(invoiceId: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();
        const id = this.unionQuery.getEntityLatestNegotiationId(invoiceId);

        this.negotiationStore.acceptOffer(id);

        return this.payerService
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
                                'PAYER_INVOICE_NOTIFICATIONS.ACCEPT_LATEST_NEGOTIATION_OFFER.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.negotiationStore.acceptOfferError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.ACCEPT_LATEST_NEGOTIATION_OFFER.ERROR'
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

        return this.payerService
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
                                'PAYER_INVOICE_NOTIFICATIONS.REJECT_LATEST_NEGOTIATION_OFFER.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.negotiationStore.rejectOfferError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.REJECT_LATEST_NEGOTIATION_OFFER.ERROR'
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

        return this.payerService
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
                        this.negotiationStore.updatePayerOfferSuccess(id, {
                            ...payload,
                            discountValue,
                        });
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.UPDATE_LATEST_NEGOTIATION_OFFER.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.negotiationStore.updateOfferError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.UPDATE_LATEST_NEGOTIATION_OFFER.ERROR'
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

        return this.payerService
            .getPayerInvoiceDiscountNegotiations(enterpriseId, id)
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

    negotiate(id: number, payload: NegotiationPayload) {
        this.store.negotiate(id);

        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.payerService
            .negotiateInvoiceDiscount(enterpriseId, id, payload)
            .pipe(
                tap(
                    payload => {
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.NEGOTIATE.SUCCESS'
                            ),
                            'OK'
                        );

                        this.store.negotiateSuccess(id);
                        this.negotiationStore.insert(payload);
                        this.unionStore.insert(id, payload.id);
                    },
                    error => {
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.NEGOTIATE.ERROR'
                            ),
                            'OK'
                        );
                        this.store.negotiateError(id, error);
                    }
                )
            );
    }

    updateProvider(id: number, providerId: number) {
        this.store.updateProvider(id);

        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.payerService
            .updateInvoiceProvider(enterpriseId, id, providerId)
            .pipe(
                tap(
                    payload => {
                        this.store.updateProviderSuccess(id, payload);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.UPDATE_PROVIDER.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.store.updateProviderError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.UPDATE_PROVIDER.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    editProvider(id: number) {
        this.store.editProvider(id);
    }

    cancelProvider(id: number) {
        this.store.cancelProvider(id);
    }

    fetch(id: number) {
        // const shouldFetch =
        //     this.query.getUIEntityError(id) ||
        //     !this.query.getUIEntityLoaded(id);

        // if (!shouldFetch) return EMPTY;

        this.store.fetch(id);

        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.payerService
            .getInvoice(enterpriseId, id)
            .pipe(
                tap(
                    payload => this.store.fetchSuccess(id, payload),
                    error => this.store.fetchError(id, error)
                )
            );
    }

    create(payload: PayerInvoicePayload) {
        const id = this.authenticationQuery.getEnterpriseId();

        this.createStore.submit();

        return this.payerService.createInvoice(id, payload).pipe(
            tap(
                payload => {
                    this.createStore.submitSuccess();
                    this.store.insert(payload);
                },
                error => {
                    this.createStore.submitError(error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'PAYER_INVOICE_NOTIFICATIONS.CREATE.ERROR'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    delete(id: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.store.delete(id);

        return this.payerService.deleteInvoice(enterpriseId, id).pipe(
            tap(
                () => {
                    this.store.deleteSuccess(id);
                    this.snackbar.open(
                        this.translateService.instant(
                            'PAYER_INVOICE_NOTIFICATIONS.DELETE.SUCCESS'
                        ),
                        'OK'
                    );
                },
                error => {
                    this.store.deleteError(id, error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'PAYER_INVOICE_NOTIFICATIONS.DELETE.ERROR'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    select(id: number) {
        this.store.toggle(id);
    }

    selectAll(selected: boolean) {
        this.store.toggleAll(selected);
    }

    clearSelection() {
        this.store.clearSelection();
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

    changeFilters(filters: PayerInvoicePaginationFiltersPayload) {
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(page, filters);
    }

    private fetchPage(
        page: Page,
        filters: PayerInvoicePaginationFiltersPayload
    ) {
        const id = this.authenticationQuery.getEnterpriseId();

        return this.payerService
            .getInvoicePage(id, page, filters)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }

    updateLender(id: number, lenderId: number) {
        this.store.updateLender(id);

        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.payerService
            .updateInvoiceLender(enterpriseId, id, lenderId)
            .pipe(
                tap(
                    payload => {
                        this.store.updateLenderSuccess(id, payload);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.UPDATE_LENDER.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.store.updateLenderError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_INVOICE_NOTIFICATIONS.UPDATE_LENDER.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    editLender(id: number) {
        this.store.editLender(id);
    }

    cancelLender(id: number) {
        this.store.cancelLender(id);
    }

    fetchFundingRequest(id: number) {
        // const shouldFetch = this.invoiceFundingRequestUnionQuery.shouldFetch(
        //     id
        // );

        // if (!shouldFetch) return EMPTY;

        this.invoiceFundingRequestUnionStore.fetchAll(id);

        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.payerService
            .getPayerInvoiceFundingRequest(enterpriseId, id)
            .pipe(
                tap(
                    payload => {
                        this.fundingRequestStore.insert(payload);
                        this.invoiceFundingRequestUnionStore.fetchAllSuccess(
                            id,
                            payload.map(funding => funding.id)
                        );
                    },
                    error =>
                        this.invoiceFundingRequestUnionStore.fetchAllError(
                            id,
                            error
                        )
                )
            );
    }

    fetchFundingRequestLogs(invoiceId: number, requestId: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.fundingRequestLogUnionStore.fetch(requestId);

        // const shouldFetch = this.fundingRequestLogUnionQuery.shouldFetchEntity(
        //     requestId
        // );

        // if (!shouldFetch) return EMPTY;

        this.fundingRequestLogUnionStore.fetch(requestId);

        return this.payerService
            .fetchFundingRequestLogs(enterpriseId, invoiceId, requestId)
            .pipe(
                tap(
                    payload =>
                        this.fundingRequestLogUnionStore.fetchSuccess(
                            requestId,
                            payload
                        ),
                    error =>
                        this.fundingRequestLogUnionStore.fetchError(
                            requestId,
                            error
                        )
                )
            );
    }
}
