import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BulkInvoiceFormPayload } from '@libera/models/bulk-invoice';
import { Currency } from '@libera/models/catalog';
import { CurrencyQuery, CurrencyStoreService } from '@libera/state';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BulkInvoiceStoreService } from '../../state/bulk-invoice.store.service';
import { BulkInvoiceSubmitQuery } from '../../state/bulk-invoice.submit.query';
import { BulkInvoiceSubmitStore } from '../../state/bulk-invoice.submit.store';
import { CustomAttributeQuery } from '../../state/custom-attribute.query';
import { CustomAttributeStoreService } from '../../state/custom-attribute.store.service';

@Component({
    selector: 'bulk-load',
    templateUrl: './bulk-load.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkLoadPage implements OnInit {
    isSubmitting$: Observable<boolean> = this.query.selectSubmitting();

    customAttributesError$: Observable<
        any
    > = this.customAttributeQuery.selectError();

    currenciesError$: Observable<any> = this.currencyQuery.selectError();

    currencies$: Observable<Currency[]> = this.currencyQuery.selectEntities();

    shouldRenderProgressSpinner$: Observable<boolean>;

    shouldRenderForm$: Observable<boolean>;

    constructor(
        private query: BulkInvoiceSubmitQuery,
        private storeService: BulkInvoiceStoreService,
        private currencyQuery: CurrencyQuery,
        private currencyStoreService: CurrencyStoreService,
        private customAttributeQuery: CustomAttributeQuery,
        private customAttributeStoreService: CustomAttributeStoreService
    ) {}

    ngOnInit() {
        this.fetchCurrencies();
        this.fetchCustomAttributes();

        const isLoadingCurrencies$ = this.currencyQuery.selectLoading();
        const hasLoadedCurrencies$ = this.currencyQuery.selectLoaded();
        const isLoadingCustomAttributes$ = this.customAttributeQuery.selectLoading();
        const hasLoadedCustomAttributes$ = this.customAttributeQuery.selectLoaded();

        this.shouldRenderProgressSpinner$ = combineLatest(
            isLoadingCurrencies$,
            isLoadingCustomAttributes$
        ).pipe(
            map(
                ([isLoadingCurrencies, isLoadingCustomAttributes]) =>
                    isLoadingCurrencies || isLoadingCustomAttributes
            )
        );

        this.shouldRenderForm$ = combineLatest(
            hasLoadedCurrencies$,
            hasLoadedCustomAttributes$
        ).pipe(
            map(
                ([hasLoadedCurrencies, hasLoadedCustomAttributes]) =>
                    hasLoadedCurrencies && hasLoadedCustomAttributes
            )
        );
    }

    fetchCurrencies() {
        this.currencyStoreService.fetchAll().subscribe();
    }

    fetchCustomAttributes() {
        this.customAttributeStoreService.fetchAll().subscribe();
    }

    onSubmit(payload: BulkInvoiceFormPayload) {
      this.storeService.bulkLoad(payload).subscribe();
    }
}
