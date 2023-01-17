import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PayerService, S3Service } from '@libera/api';
import {
    BulkInvoiceFormPayload,
    BulkInvoicePayload,
} from '@libera/models/bulk-invoice';
import { AuthenticationQuery } from '@libera/state';
import { Page } from '@mediomelon/ng-core';
import { EMPTY } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { BulkInvoiceQuery } from './bulk-invoice.query';
import { BulkInvoiceStore } from './bulk-invoice.store';
import { BulkInvoiceSubmitQuery } from './bulk-invoice.submit.query';
import { BulkInvoiceSubmitStore } from './bulk-invoice.submit.store';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class BulkInvoiceStoreService {
    constructor(
        private store: BulkInvoiceStore,
        private query: BulkInvoiceQuery,
        private submitStore: BulkInvoiceSubmitStore,
        private authenticationQuery: AuthenticationQuery,
        private s3Service: S3Service,
        private payerService: PayerService,
        private snackbar: MatSnackBar,
        private router: Router,
        private translateService: TranslateService
    ) {}

    bulkLoad({ file, ...rest }: BulkInvoiceFormPayload) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.submitStore.submit();

        return this.s3Service
            .generateUrl({ filename: file.name, contentType: file.type })
            .pipe(
                switchMap(url => this.s3Service.upload(url, file)),
                switchMap(() =>
                    this.payerService.bulkLoadInvoices(enterpriseId, {
                        ...rest,
                        filename: file.name,
                    })
                ),
                tap(
                    payload => {
                        this.submitStore.submitSuccess();
                        this.store.insert(payload);
                        this.snackbar.open(
                            this.translateService.instant(
                                'BULK_NOTIFICATIONS.BULK_LOAD.SUCCESS'
                            ),
                            'OK'
                        );
                        this.router.navigateByUrl('/core/invoices/bulk');
                    },
                    error => {
                        this.submitStore.submitError(error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'BULK_NOTIFICATIONS.BULK_LOAD.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    fetch(id: number) {
        this.store.fetch(id);

        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        return this.payerService
            .fetchBulkInvoice(enterpriseId, id)
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

        this.store.fetchPage();

        return this.fetchPage(page);
    }

    changePage(page: Page) {
        this.store.fetchPage(page);

        return this.fetchPage(page);
    }

    private fetchPage(page: Page) {
        const id = this.authenticationQuery.getEnterpriseId();

        return this.payerService
            .fetchBulkInvoicePage(id, page)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }
}
