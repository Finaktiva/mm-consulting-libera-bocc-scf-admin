import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { PayerInvoicePaginationFiltersPayload } from '@libera/models/payer';
import { PROVIDER_INVOICE_PAGINATION_FILTER_BY } from '@libera/models/provider';
import { NeverShowErrorStateMatcher } from '@libera/providers';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'provider-invoice-list-filter-form',
    templateUrl: './provider-invoice-list-filter-form.component.html',
    providers: [
        { provide: ErrorStateMatcher, useClass: NeverShowErrorStateMatcher },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderInvoiceListFilterFormComponent extends FormBase
    implements OnInit, OnDestroy {
    @Input() filters: PayerInvoicePaginationFiltersPayload;

    @ViewChild(MatInput, { static: false }) input: MatInput;

    PROVIDER_INVOICE_PAGINATION_FILTER_BY = PROVIDER_INVOICE_PAGINATION_FILTER_BY;

    private subscription = new Subscription();

    constructor(formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group({
            filter_by: [null, Validators.required],
            q: [null, Validators.required],
        });
    }

    ngOnInit() {
        if (this.filters)
            this.form.patchValue(this.filters, { emitEvent: false });

        const filterBy = this.form.get('filter_by');

        const sub1 = this.form.valueChanges
            .pipe(debounceTime(500))
            .subscribe(() => this.onSubmit());

        const sub2 = filterBy.valueChanges.subscribe(value => {
            this.form.patchValue(
                {
                    q: null,
                },
                { emitEvent: false }
            );

            setTimeout(() => this.input.focus(), 0);
        });

        this.subscription.add(sub1).add(sub2);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    shouldRenderTextInput(): boolean {
        const filterBy = this.filterBy;
        return (
            filterBy == PROVIDER_INVOICE_PAGINATION_FILTER_BY.INVOICE_NUMBER ||
            filterBy == PROVIDER_INVOICE_PAGINATION_FILTER_BY.PAYER ||
            filterBy == PROVIDER_INVOICE_PAGINATION_FILTER_BY.NIT
        );
    }

    shouldRenderNumberInput(): boolean {
        const filterBy = this.filterBy;
        return (
            filterBy ==
                PROVIDER_INVOICE_PAGINATION_FILTER_BY.DISCOUNT_PERCENTAGE ||
            filterBy == PROVIDER_INVOICE_PAGINATION_FILTER_BY.DISCOUNT_VALUE
        );
    }

    shouldRenderDatepicker(): boolean {
        const filterBy = this.filterBy;
        return (
            filterBy ==
                PROVIDER_INVOICE_PAGINATION_FILTER_BY.DISCOUNT_DUE_DATE ||
            filterBy ==
                PROVIDER_INVOICE_PAGINATION_FILTER_BY.EFFECTIVE_PAYMENT_DATE ||
            filterBy == PROVIDER_INVOICE_PAGINATION_FILTER_BY.STARTING_DATE
        );
    }

    shouldRenderResetButton() {
        const { filter_by, q } = this.form.value;
        return !filter_by && !q;
    }

    onReset() {
        this.form.reset(undefined, { emitEvent: false });
        this._submit.emit(this.getFormValue());
    }

    get filterBy() {
        return this.form.value.filter_by;
    }

    getFormValue() {
        const { filter_by, q } = this.form.value;

        if (!q || 
            (filter_by != PROVIDER_INVOICE_PAGINATION_FILTER_BY.STARTING_DATE && 
             filter_by != PROVIDER_INVOICE_PAGINATION_FILTER_BY.EFFECTIVE_PAYMENT_DATE &&
             filter_by != PROVIDER_INVOICE_PAGINATION_FILTER_BY.DISCOUNT_DUE_DATE ))
            return this.form.value;

        const asIsoString = moment(q).toISOString();

        return {
            filter_by,
            q: asIsoString,
        };
    }
}
