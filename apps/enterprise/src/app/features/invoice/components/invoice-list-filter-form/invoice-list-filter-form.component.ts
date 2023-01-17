import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { INVOICE_PAGINATION_FILTER_BY, PayerInvoicePaginationFiltersPayload } from '@libera/models/payer';
import { INVOICE_STATUS } from '@libera/models/shared';
import { NeverShowErrorStateMatcher } from '@libera/providers';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'invoice-list-filter-form',
    templateUrl: './invoice-list-filter-form.component.html',
    providers: [
        { provide: ErrorStateMatcher, useClass: NeverShowErrorStateMatcher },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListFilterFormComponent extends FormBase
    implements OnInit, OnDestroy {
    @Input() filters: PayerInvoicePaginationFiltersPayload;

    @ViewChild('input', { static: false, read: MatInput }) input: MatInput;

    @ViewChild('select', { static: false, read: MatSelect }) select: MatSelect;

    INVOICE_PAGINATION_FILTER_BY = INVOICE_PAGINATION_FILTER_BY;

    INVOICE_STATUS = INVOICE_STATUS;

    private subscription = new Subscription();

    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            filter_by: [null, Validators.required],
            status: [null, Validators.required],
            q: [null, Validators.required],
        });
    }

    ngOnInit() {
        if (this.filters)
            this.form.patchValue(this.filters, { emitEvent: false });

        const filterBy = this.form.get('filter_by');
        const query = this.form.get('q');
        const status = this.form.get('status');

        const sub1 = this.form.valueChanges
            .pipe(debounceTime(500))
            .subscribe(() => this.onSubmit());

        const sub2 = filterBy.valueChanges.subscribe(value => {
            this.form.patchValue(
                {
                    status: null,
                    q: null,
                },
                { emitEvent: false }
            );

            if (value == INVOICE_PAGINATION_FILTER_BY.STATUS) {
                status.enable();
                query.disable();
            } else if (
                value == INVOICE_PAGINATION_FILTER_BY.EXPIRATION_DATE ||
                value == INVOICE_PAGINATION_FILTER_BY.INVOICE_NUMBER ||
                value == INVOICE_PAGINATION_FILTER_BY.PROVIDER
            ) {
                status.disable();
                query.enable();
            }

            setTimeout(() => (this.input || this.select).focus(), 0);
        });

        this.subscription.add(sub1).add(sub2);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    shouldRenderResetButton() {
        const { filter_by, q, status } = this.form.value;
        return !filter_by && (!q || !status);
    }

    onReset() {
        this.form.reset(undefined, { emitEvent: false });
        this._submit.emit(this.getFormValue());
    }


    getFormValue() {
        const { filter_by, q } = this.form.value;

        if (!q || filter_by != INVOICE_PAGINATION_FILTER_BY.EXPIRATION_DATE)
            return this.form.value;

        const asIsoString = moment(q).toISOString();

        return {
            filter_by,
            q: asIsoString,
        };
    }
}
