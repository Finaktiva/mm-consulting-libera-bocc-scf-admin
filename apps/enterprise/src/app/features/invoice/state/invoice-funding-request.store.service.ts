import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PayerService, S3Service } from '@libera/api';
import {
    LenderInvoiceFundingRequest,
    LenderInvoiceFundingRequestFormPayload,
} from '@libera/models/lender';
import { INVOICE_STATUS } from '@libera/models/shared';
import { AuthenticationQuery } from '@libera/state';
import { tap, switchMap, mapTo } from 'rxjs/operators';

import { CreateFundingRequestStore } from './create-funding-request.store';
import { FundingRequestStore } from './funding-request.store';
import { InvoiceFundingRequestUnionStore } from './invoice-funding-request.union.store';
import { PayerInvoiceStore } from './payer-invoice.store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InvoiceFundingRequestStoreService {
    constructor(
        private unionStore: InvoiceFundingRequestUnionStore,
        private store: FundingRequestStore,
        private authenticationQuery: AuthenticationQuery,
        private snackbar: MatSnackBar,
        private payerService: PayerService,
        private createStore: CreateFundingRequestStore,
        private payerInvoiceStore: PayerInvoiceStore,
        private translateService: TranslateService,
        private s3Service: S3Service
    ) {}

    createRequestPayload(
        id: number,
        { file, ...payload }: LenderInvoiceFundingRequestFormPayload
    ) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();
        this.createStore.submit();

        let process: Observable<any>;

        if (!!file) {
            const filePayload = {
                contentType: file.type,
                filename: file.name,
            };
            process = this.s3Service
                .generateUrl(filePayload)
                .pipe<any, LenderInvoiceFundingRequest>(
                    switchMap(url => this.s3Service.upload(url, file)),
                    mapTo({
                        ...payload,
                        ...filePayload,
                    })
                );
        } else {
            process = of(payload);
        }

        return process.pipe(
            switchMap(response =>
                this.payerService.createFundingRequest(
                    enterpriseId,
                    id,
                    response
                )
            ),
            tap(
                response => {
                    this.snackbar.open(
                        this.translateService.instant(
                            'FUNDING_REQUEST_NOTIFICATIONS.CREATE_REQUEST_PAYLOAD.SUCCESS'
                        ),
                        'OK'
                    );

                    this.createStore.submitSuccess();
                    this.store.insert(response);
                    this.unionStore.insert(id, response.id);
                    this.payerInvoiceStore.updateStatus(
                        id,
                        INVOICE_STATUS.FUNDING_IN_PROGRESS
                    );
                },
                error => {
                    this.createStore.submitError(error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'FUNDING_REQUEST_NOTIFICATIONS.CREATE_REQUEST_PAYLOAD.ERROR'
                        ),
                        'OK'
                    );
                }
            )
        );
    }
}
