import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { LENDER_INVOICE_STATUS, lenderInvoiceRequestPaginationFilterBy } from '@libera/models/lender';
import { PayerInvoicePaginationFiltersPayload } from '@libera/models/payer';
import { NeverShowErrorStateMatcher } from '@libera/providers';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'invoice-request-list-filter-form',
    templateUrl: './invoice-request-list-filter-form.component.html',
    providers: [
        { provide: ErrorStateMatcher, useClass: NeverShowErrorStateMatcher },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceRequestListFilterFormComponent extends FormBase
    implements OnInit, OnDestroy {
    @Input() filters: PayerInvoicePaginationFiltersPayload;

    @ViewChild(MatInput, { static: false }) input: MatInput;

    lenderInvoiceRequestPaginationFilterBy = lenderInvoiceRequestPaginationFilterBy;

    LENDER_INVOICE_STATUS = LENDER_INVOICE_STATUS;

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

            // setTimeout(() => this.input.focus(), 0);
        });

        this.subscription.add(sub1).add(sub2);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    shouldRenderTextInput(): boolean {
        const filterBy = this.filterBy;
        return filterBy == lenderInvoiceRequestPaginationFilterBy.payer;
    }

    shouldRenderSelect(): boolean {
        const filterBy = this.filterBy;
        return filterBy == lenderInvoiceRequestPaginationFilterBy.status;
    }

    shouldRenderDatepicker(): boolean {
        const filterBy = this.filterBy;
        return (
            filterBy ==
                lenderInvoiceRequestPaginationFilterBy.effectivePaymentDate ||
            filterBy ==
                lenderInvoiceRequestPaginationFilterBy.expectedPaymentDate
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
}
