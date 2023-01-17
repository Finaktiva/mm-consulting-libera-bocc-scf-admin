import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProviderService } from '@libera/api';
import { tap } from 'rxjs/operators';
import { PaymentRequestStore } from './payment-request.store';
import { AuthenticationQuery } from '@libera/state';
import { INVOICE_STATUS } from '@libera/models/shared';
import { CreatePaymentRequestStore } from './create-payment-request.store';
import { PaymentRequestQuery } from './payment-request.query';
import { EMPTY } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProviderInvoiceStore } from './provider-invoice.store';

@Injectable({
    providedIn: 'root',
})
export class PaymentRequestStoreService {
    constructor(
        private store: PaymentRequestStore,
        private query: PaymentRequestQuery,
        private providerService: ProviderService,
        private snackbar: MatSnackBar,
        private authenticationQuery: AuthenticationQuery,
        private providerInvoiceStore: ProviderInvoiceStore,
        private createStore: CreatePaymentRequestStore,
        private translateService: TranslateService
    ) {}

    fetch(invoiceId: number) {
        // const shouldFetch = this.query.shouldFetch(invoiceId);

        // if (!shouldFetch) return EMPTY;

        this.store.fetch(invoiceId);

        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.providerService
            .getProviderPayment(enterpriseId, invoiceId)
            .pipe(
                tap(
                    payload => this.store.fetchSuccess(invoiceId, payload),
                    error => this.store.fetchError(invoiceId, error)
                )
            );
    }

    createRequestPayment(id: number, fundingRequestId: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();
        this.createStore.submit();

        return this.providerService
            .createPaymentConfirmation(enterpriseId, id, fundingRequestId)
            .pipe(
                tap(
                    response => {
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYMENT_REQUEST.SUCCESS'
                            ),
                            'OK'
                        );

                        this.createStore.submitSuccess();
                        this.providerInvoiceStore.updateStatus(
                            id,
                            INVOICE_STATUS.PAYMENT_CONFIRMED
                        );
                    },
                    error => {
                        this.createStore.submitError(error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYMENT_REQUEST.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }
}
