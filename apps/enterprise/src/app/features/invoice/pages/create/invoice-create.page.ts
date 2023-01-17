import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Currency } from '@libera/models/catalog';
import { PayerInvoice, PayerInvoicePayload } from '@libera/models/payer';
import { CurrencyQuery, CurrencyStoreService } from '@libera/state';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CreateInvoiceRedirectDialog } from '../../dialogs/create-invoice-redirect/create-invoice-redirect.dialog';
import { CreateInvoiceQuery } from '../../state/create-invoice.query';
import { CustomAttributeQuery } from '../../state/custom-attribute.query';
import { CustomAttributeStoreService } from '../../state/custom-attribute.store.service';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';

@Component({
    selector: 'invoice-create-page',
    templateUrl: './invoice-create.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceCreatePage implements OnInit {
    isSubmitting$: Observable<
        boolean
    > = this.createInvoiceQuery.selectSubmitting();

    customAttributesError$: Observable<
        any
    > = this.customAttributeQuery.selectError();

    currencies$: Observable<Currency[]> = this.currencyQuery.selectEntities();

    currenciesError$: Observable<any> = this.currencyQuery.selectError();

    shouldRenderProgressSpinner$: Observable<boolean> = combineLatest(
        this.customAttributeQuery.selectLoading(),
        this.currencyQuery.selectLoading()
    ).pipe(
        map(
            ([isLoadingAttributes, isLoadingCurrencies]) =>
                isLoadingAttributes || isLoadingCurrencies
        )
    );

    shouldRenderForm$: Observable<boolean> = combineLatest(
        this.customAttributeQuery.selectLoaded(),
        this.currencyQuery.selectLoaded()
    ).pipe(
        map(
            ([hasLoadedAttributes, hasLoadedCurrencies]) =>
                hasLoadedAttributes && hasLoadedCurrencies
        )
    );

    constructor(
        private currencyQuery: CurrencyQuery,
        private currencyStoreService: CurrencyStoreService,
        private customAttributeQuery: CustomAttributeQuery,
        private customAttributeStoreService: CustomAttributeStoreService,
        private createInvoiceQuery: CreateInvoiceQuery,
        private invoiceStoreService: PayerInvoiceStoreService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit() {
        this.fetchCurrencies();
        this.fetchCustomAttributes();
    }

    onSubmit(payload: PayerInvoicePayload) {
        this.invoiceStoreService
            .create(payload)
            .pipe(
                switchMap(payload =>
                    this.dialog
                        .open(CreateInvoiceRedirectDialog)
                        .afterClosed()
                        .pipe(
                            map(
                                (
                                    shouldRedirect: boolean
                                ): [boolean, PayerInvoice] => [
                                    shouldRedirect,
                                    payload,
                                ]
                            )
                        )
                )
            )
            .subscribe(([shouldRedirect, payload]) => {
                if (shouldRedirect)
                    return this.router.navigate([
                        'core',
                        'payer-invoices',
                        payload.id,
                    ]);
                this.router.navigateByUrl('/core/payer-invoices');
            });
    }

    fetchCurrencies() {
        this.currencyStoreService.fetchAll().subscribe();
    }

    fetchCustomAttributes() {
        this.customAttributeStoreService.fetchAll().subscribe();
    }
}
