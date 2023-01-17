import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LenderService, S3Service } from '@libera/api';
import {
    ConfirmPaymentFormPayload,
    LENDER_INVOICE_STATUS,
    LenderInvoiceRequestPaginationFiltersPayload,
} from '@libera/models/lender';
import { AuthenticationQuery } from '@libera/state';
import { Page } from '@mediomelon/ng-core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';

import { LenderInvoiceRequestDetailQuery } from './lender-invoice-request-detail.query';
import { LenderInvoiceRequestDetailStore } from './lender-invoice-request-detail.store';
import { LenderInvoiceRequestQuery } from './lender-invoice-request.query';
import { LenderInvoiceRequestStore } from './lender-invoice-request.store';

@Injectable({
    providedIn: 'root',
})
export class LenderInvoiceRequestStoreService {
    constructor(
        private store: LenderInvoiceRequestStore,
        private query: LenderInvoiceRequestQuery,
        private detailStore: LenderInvoiceRequestDetailStore,
        private detailQuery: LenderInvoiceRequestDetailQuery,
        private authenticationQuery: AuthenticationQuery,
        private lenderService: LenderService,
        private s3Service: S3Service,
        private snackbar: MatSnackBar,
        private translateService: TranslateService
    ) {}

    confirmPayment(
        id: number,
        requestId: number,
        { file, ...rest }: ConfirmPaymentFormPayload
    ) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();
        this.detailStore.confirm(id);

        let process: Observable<any>;

        if (!!file) {
            const filePayload = {
                contentType: file.type,
                filename: file.name,
            };
            process = this.s3Service.generateUrl(filePayload).pipe(
                switchMap(url => this.s3Service.upload(url, file)),
                mapTo({
                    ...rest,
                    ...filePayload,
                })
            );
        } else {
            process = of(rest);
        }

        return process.pipe(
            switchMap(response =>
                this.lenderService.changeInvoiceStatus(
                    enterpriseId,
                    requestId,
                    'ACCEPTED',
                    response
                )
            ),
            tap(
                () => {
                    this.detailStore.confirmSuccess(id);
                    this.store.changeStatus(
                        id,
                        LENDER_INVOICE_STATUS.PENDING_PROVIDER_PAYMENT_CONFIRMATION
                    );
                    this.snackbar.open(
                        this.translateService.instant(
                            'LENDER_INVOICE_REQUEST_NOTIFICATIONS.CONFIRM_PAYMENT.SUCCESS'
                        ),
                        'OK'
                    );
                },
                ({ error }) => {
                    this.detailStore.confirmError(id, error);

                    let key =
                        'LENDER_INVOICE_REQUEST_NOTIFICATIONS.CONFIRM_PAYMENT.ERROR';

                    if (error.code) key = 'COMMON.ERRORS.CODE.' + error.code;

                    this.snackbar.open(
                        this.translateService.instant(key),
                        'OK'
                    );
                }
            )
        );
    }

    rejectPayment(id: number, requestId: number, comments: string) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.detailStore.reject(id);

        return this.lenderService
            .changeInvoiceStatus(enterpriseId, requestId, 'REJECTED', {
                comments,
            })
            .pipe(
                tap(
                    () => {
                        this.detailStore.rejectSuccess(id);
                        this.store.changeStatus(
                            id,
                            LENDER_INVOICE_STATUS.REJECTED
                        );
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_INVOICE_REQUEST_NOTIFICATIONS.REJECT_PAYMENT.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.detailStore.rejectError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'LENDER_INVOICE_REQUEST_NOTIFICATIONS.REJECT_PAYMENT.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    fetch(id: number) {
        // const shouldFetch =
        //     !!this.detailQuery.getUIEntityError(id) ||
        //     !this.detailQuery.getUIEntityLoaded(id);

        // if (!shouldFetch) return EMPTY;

        this.detailStore.fetch(id);

        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.lenderService
            .getInvoice(enterpriseId, id)
            .pipe(
                tap(
                    payload => this.detailStore.fetchSuccess(id, payload),
                    error => this.detailStore.fetchError(id, error)
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

    changeFilters(filters: LenderInvoiceRequestPaginationFiltersPayload) {
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(page, filters);
    }

    private fetchPage(
        page: Page,
        filters: LenderInvoiceRequestPaginationFiltersPayload
    ) {
        const id = this.authenticationQuery.getEnterpriseId();

        return this.lenderService
            .getInvoicePage(id, page, filters)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }
}
