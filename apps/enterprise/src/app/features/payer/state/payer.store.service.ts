import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LenderService } from '@libera/api';
import {
    PayerCustomAttribute,
    PayerCustomAttributePayload,
    PayerListPaginationFilterPayload,
} from '@libera/models/payer';
import { AuthenticationQuery } from '@libera/state';
import { Page } from '@mediomelon/ng-core';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { mapAttributesPayload } from '../utils';
import { PayerQuery } from './payer.query';
import { PayerStore } from './payer.store';

@Injectable({
    providedIn: 'root',
})
export class PayerStoreService {
    constructor(
        private payerQuery: PayerQuery,
        private payerStore: PayerStore,
        private lenderService: LenderService,
        private authenticationQuery: AuthenticationQuery,
        private snackbar: MatSnackBar,
        private translateService: TranslateService
    ) {}

    changePage(page: Page) {
        const filters = this.payerQuery.getFilters();

        this.payerStore.fetchPage(page);

        return this.fetchPage(page, filters);
    }

    changeFilters(filters: PayerListPaginationFilterPayload) {
        this.payerStore.fetchPageWithFilters(filters);

        const page = this.payerQuery.getPage();

        return this.fetchPage(page, filters);
    }

    fetchCurrentPage() {
        // const shouldFetch = this.payerQuery.shouldFetch();

        // if (!shouldFetch) return EMPTY;

        const page = this.payerQuery.getPage();
        const filters = this.payerQuery.getFilters();

        this.payerStore.fetchPage();
        return this.fetchPage(page, filters);
    }

    private fetchPage(page: Page, filters: PayerListPaginationFilterPayload) {
        return this.lenderService
            .getPayers(this.enterpriseId, page, filters)
            .pipe(
                tap(
                    payload => this.payerStore.fetchPageSuccess(payload),
                    error => this.payerStore.fetchPageError(error)
                )
            );
    }

    fetch(id: number) {
        // const shouldFetch = this.payerQuery.shouldFetchEntity(id);

        // if (!shouldFetch) return EMPTY;

        this.payerStore.fetch(id);

        return this.lenderService.getPayersDetail(this.enterpriseId, id).pipe(
            tap(
                payload => {
                    this.payerStore.fetchSuccess(id, payload);
                },
                error => this.payerStore.fetchError(id, error)
            )
        );
    }

    deleteCustomAttribute(payerId: number, attributeId: number) {
        this.payerStore.deleteCustomAttribute(payerId);

        return this.lenderService
            .deletePayerCustomAttribute(this.enterpriseId, payerId, attributeId)
            .pipe(
                tap(
                    () =>
                        this.payerStore.deleteCustomAttributeSuccess(
                            payerId,
                            attributeId
                        ),
                    err =>
                        this.payerStore.deleteCustomAttributeError(payerId, err)
                )
            );
    }

    updatePayerCustomAttributes(
        payerId: number,
        payload: PayerCustomAttribute[]
    ) {
        this.payerStore.updateCustomAttributes(payerId);

        const parsedPayload: PayerCustomAttributePayload[] = payload.map(
            mapAttributesPayload
        );

        return this.lenderService
            .updatePayerCustomAttributes(
                this.enterpriseId,
                payerId,
                parsedPayload
            )
            .pipe(
                tap(
                    response => {
                        this.payerStore.updateCustomAttributesSuccess(
                            payerId,
                            response
                        );
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_CUSTOM_ATTRIBUTES.SUCCESS.SAVED_INFO'
                            ),
                            'OK'
                        );
                    },
                    err => {
                        this.payerStore.updateCustomAttributesError(
                            payerId,
                            err
                        );
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_CUSTOM_ATTRIBUTES.ERRORS.UPDATE_INFO'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    get enterpriseId() {
        return this.authenticationQuery.getEnterpriseId();
    }
}
