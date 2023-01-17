import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AvailableEnterprise } from '@libera/models/enterprise';
import { PayerInvoice } from '@libera/models/payer';
import { NEGOTIATION_DISCOUNT_TYPE, NegotiationDiscountType } from '@libera/models/shared';
import { isPlainObject, isString, plainObjectValidator } from '@libera/shared';
import { FormBase } from '@mediomelon/ng-core';
import { combineLatest, merge, Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, filter, map, mapTo, startWith, switchMap, tap } from 'rxjs/operators';

import { AvailableEnterpriseQuery } from '../../state/available-enterprise.query';
import { AvailableEnterpriseStore } from '../../state/available-enterprise.store';
import { AvailableEnterpriseStoreService } from '../../state/available-enterprise.store.service';
import { calculateDiscount } from '../../utils';

@Component({
    selector: 'bulk-invoice-negotiation-form',
    templateUrl: './bulk-invoice-negotiation-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        AvailableEnterpriseStoreService,
        AvailableEnterpriseQuery,
        AvailableEnterpriseStore,
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'standard' },
        },
    ],
    styles: [
        `
            p.mat-body,
            p.mat-body-2 {
                margin-top: 0 !important;
            }
        `,
    ],
})
export class BulkInvoiceNegotiationFormComponent extends FormBase
    implements OnInit {
    @Input() invoices: PayerInvoice[];

    isLoading$: Observable<boolean> = this.query.selectLoading();

    error$: Observable<any> = this.query.selectError();

    enterprises$: Observable<AvailableEnterprise[]>;

    DISCOUNT_TYPE = NEGOTIATION_DISCOUNT_TYPE;

    filteredInvoices$: Observable<PayerInvoice[]>;

    total$: Observable<number>;

    discount$: Observable<number>;

    subtotal$: Observable<number>;

    remainingQuota$: Observable<number>;

    isValidQuota$: Observable<boolean>;

    isInvalidQuota$: Observable<boolean>;

    searchControl = new FormControl('');

    tomorrow: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    private subscription = new Subscription();

    constructor(
        private formBuilder: FormBuilder,
        private query: AvailableEnterpriseQuery,
        private storeService: AvailableEnterpriseStoreService
    ) {
        super();
    }

    ngOnInit() {
        const invoices = this.invoices || [];

        this.form = this.formBuilder.group({
            discountType: [null, Validators.required],
            percentage: [
                null,
                [Validators.required, Validators.min(0), Validators.max(100)],
            ],
            expectedPaymentDate: [null, Validators.required],
            discountDueDate: [null, Validators.required],
            lender: [null, [Validators.required, plainObjectValidator]],
            invoices: [[...invoices], Validators.required],
        });

        const searchValueChanges$ = this.searchControl.valueChanges;
        const enterpriseValueChanges$: Observable<
            string | AvailableEnterprise
        > = this.form.get('lender').valueChanges.pipe(startWith(null));
        const discountTypeValueChanges$: Observable<
            NegotiationDiscountType
        > = this.form.get('discountType').valueChanges.pipe(startWith(null));
        const percentageValueChanges$: Observable<number> = this.form
            .get('percentage')
            .valueChanges.pipe(startWith(null));
        const invoiceValueChanges$: Observable<PayerInvoice[]> = this.form
            .get('invoices')
            .valueChanges.pipe(startWith(invoices));

        this.filteredInvoices$ = searchValueChanges$.pipe(
            map(searchValue =>
                searchValue
                    ? invoices.filter(invoice =>
                          invoice.invoiceNumber
                              .toLowerCase()
                              .includes(searchValue.toLowerCase())
                      )
                    : invoices
            ),
            startWith(invoices)
        );

        this.total$ = invoiceValueChanges$.pipe(
            map(invoices =>
                invoices.reduce(
                    (previousValue, invoice) =>
                        invoice.payment.amount + previousValue,
                    0
                )
            )
        );

        this.discount$ = combineLatest(
            invoiceValueChanges$,
            discountTypeValueChanges$,
            percentageValueChanges$
        ).pipe(
            map(([invoices, discountType, percentage]) =>
                invoices && invoices.length && discountType && percentage
                    ? invoices.reduce(
                          (previousValue, invoice) =>
                              calculateDiscount(
                                  invoice.payment.amount,
                                  discountType,
                                  invoice.expirationDate,
                                  invoice.emissionDate,
                                  percentage
                              ) + previousValue,
                          0
                      )
                    : 0
            )
        );

        this.subtotal$ = combineLatest(this.total$, this.discount$).pipe(
            map(([total, discount]) =>
                discount || discount == 0 ? total - discount : total
            )
        );

        const availableQuota$ = enterpriseValueChanges$.pipe(
            map(enterprise =>
                isPlainObject(enterprise)
                    ? (enterprise as AvailableEnterprise).availableQuota
                    : null
            )
        );

        this.remainingQuota$ = combineLatest(
            this.subtotal$,
            availableQuota$
        ).pipe(
            map(([subtotal, availableQuota]) =>
                subtotal && availableQuota ? availableQuota - subtotal : null
            )
        );

        const isValidLender$: Observable<boolean> = this.form
            .get('lender')
            .statusChanges.pipe(filter(status => status == 'VALID'));

        this.isValidQuota$ = combineLatest(
            isValidLender$,
            this.remainingQuota$
        ).pipe(
            map(([isValidLender, quota]) =>
                isValidLender ? quota >= 0 : false
            )
        );

        this.isInvalidQuota$ = this.isValidQuota$.pipe(
            map(isValid => !isValid)
        );

        this.enterprises$ = merge(
            enterpriseValueChanges$.pipe(mapTo([])),
            this.query.selectEntities()
        );

        const subscription = enterpriseValueChanges$
            .pipe(
                debounceTime(500),
                filter(
                    value => isString(value) && (value as string).length >= 5
                ),
                switchMap((value: string) =>
                    this.storeService
                        .find(value, 'FUNDING')
                        .pipe(catchError(() => of([])))
                )
            )
            .subscribe();

        this.subscription.add(subscription);
    }

    displayWith(value: AvailableEnterprise): string {
        return value ? value.enterpriseName : '';
    }

    get currencyCode(): string {
        return (
            (this.invoices &&
                this.invoices[0] &&
                this.invoices[0].currencyCode) ||
            'USD'
        );
    }
}
