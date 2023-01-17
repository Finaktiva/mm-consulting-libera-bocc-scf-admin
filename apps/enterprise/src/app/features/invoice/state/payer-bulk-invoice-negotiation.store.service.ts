import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PayerService } from '@libera/api';
import {
    BulkInvoiceNegotiationCounterOfferPayload,
    BulkInvoiceNegotiationFormValue,
    BulkInvoiceNegotiationListPaginationFilterPayload,
    BulkInvoiceNegotiationPayload,
} from '@libera/models/bulk-invoice-negotiation';
import { AuthenticationQuery } from '@libera/state';
import { Page } from '@mediomelon/ng-core';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';

import { calculateDiscount } from '../utils';
import { BulkInvoiceNegotiationSubmitStore } from './bulk-invoice-negotiation.submit.store';
import { PayerBulkInvoiceNegotiationDetailStore } from './payer-bulk-invoice-negotiation-detail.store';
import { PayerBulkInvoiceNegotiationQuery } from './payer-bulk-invoice-negotiation.query';
import { PayerBulkInvoiceNegotiationStore } from './payer-bulk-invoice-negotiation.store';
import { PayerInvoiceStoreService } from './payer-invoice.store.service';
import { SharedBulkInvoiceNegotiationStoreService } from './shared-bulk-invoice-negotiation.store.service';

@Injectable({
    providedIn: 'root',
})
export class PayerBulkInvoiceNegotiationStoreService
    implements SharedBulkInvoiceNegotiationStoreService {
    constructor(
        private store: PayerBulkInvoiceNegotiationStore,
        private query: PayerBulkInvoiceNegotiationQuery,
        private detailStore: PayerBulkInvoiceNegotiationDetailStore,
        private submitStore: BulkInvoiceNegotiationSubmitStore,
        private payerInvoiceStoreService: PayerInvoiceStoreService,
        private payerService: PayerService,
        private translateService: TranslateService,
        private snackbar: MatSnackBar,
        private router: Router,
        private authenticationQuery: AuthenticationQuery
    ) {}

    acceptOffer(id: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.detailStore.acceptOffer(id);

        return this.payerService
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

        return this.payerService
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

        return this.payerService
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

    cancelOffer(id: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.detailStore.cancelOffer(id);

        return this.payerService.deleteBulkNegotiation(enterpriseId, id).pipe(
            tap(
                () => {
                    this.detailStore.cancelOfferSuccess(id);
                    this.snackbar.open(
                        this.translateService.instant(
                            'BULK_INVOICE_NEGOTIATION_NOTIFICATIONS.CANCEL_NEGOTIATION.SUCCESS'
                        ),
                        'OK'
                    );
                },
                error => {
                    this.detailStore.cancelOfferError(id, error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'BULK_INVOICE_NEGOTIATION_NOTIFICATIONS.CANCEL_NEGOTIATION.ERROR'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    bulkCreate(value: BulkInvoiceNegotiationFormValue) {
        const id = this.authenticationQuery.getEnterpriseId();
        const {
            lender,
            invoices,
            expectedPaymentDate,
            discountDueDate,
            discountType,
            percentage,
        } = value;

        const total: number = invoices.reduce(
            (previousValue, invoice) => invoice.payment.amount + previousValue,
            0
        );

        const discount: number = invoices.reduce(
            (previousValue, invoice) =>
                calculateDiscount(
                    invoice.payment.amount,
                    discountType,
                    invoice.expirationDate,
                    invoice.emissionDate,
                    percentage
                ) + previousValue,
            0
        );

        const subtotal: number =
            discount || discount == 0 ? total - discount : total;

        const payload: BulkInvoiceNegotiationPayload = {
            percentage,
            discountType,
            currentAmount: subtotal,
            discountDueDate: discountDueDate.toISOString(),
            expectedPaymentDate: expectedPaymentDate.toISOString(),
            invoices: invoices.map(invoice => invoice.id),
            lenderId: lender.id,
        };

        this.submitStore.submit();

        return this.payerService.createBulkNegotiation(id, payload).pipe(
            tap(
                payload => {
                    this.payerInvoiceStoreService.clearSelection();
                    this.submitStore.submitSuccess();
                    this.snackbar
                        .open(
                            'Estamos procesando su solicitud, al terminar se notificará a su proveedor.'
                        )
                        .onAction()
                        .subscribe(() => {
                            this.router.navigate([
                                'core',
                                'payer-invoices',
                                payload.id,
                            ]);
                        });
                },
                error => {
                    this.submitStore.submitError(error);
                    this.snackbar.open(
                        'Hubo un error al crear su solicitud. Vuelva a intentarlo.'
                    );
                }
            )
        );
    }

    fetch(id: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.detailStore.fetch(id);

        return this.payerService
            .fetchBulkNegotiation(enterpriseId, id)
            .pipe(
                tap(
                    payload => this.detailStore.fetchSuccess(id, payload),
                    error => this.detailStore.fetchError(id, error)
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

        return this.payerService
            .fetchBulkNegotiationPage(id, page, filters)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }
}
