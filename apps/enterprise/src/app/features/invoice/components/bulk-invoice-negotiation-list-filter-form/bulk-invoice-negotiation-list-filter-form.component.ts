import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import {
    BULK_INVOICE_NEGOTIATION_STATUS,
    BulkInvoiceNegotiationListFormValue,
    bulkInvoiceNegotiationListPaginationFilterByType,
    BulkInvoiceNegotiationListPaginationFilterPayload,
} from '@libera/models/bulk-invoice-negotiation';
import { INVOICE_STATUS } from '@libera/models/shared';
import { NeverShowErrorStateMatcher } from '@libera/providers';
import { FormBase } from '@mediomelon/ng-core';
import { isMoment, Moment } from 'moment';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'bulk-invoice-negotiation-list-filter-form',
    templateUrl: './bulk-invoice-negotiation-list-filter-form.component.html',
    providers: [
        { provide: ErrorStateMatcher, useClass: NeverShowErrorStateMatcher },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkInvoiceNegotiationListFilterFormComponent extends FormBase
    implements OnInit {
    @Input() filters: BulkInvoiceNegotiationListPaginationFilterPayload;

    @ViewChild('input', { static: false, read: MatInput }) input: MatInput;

    @ViewChild('select', { static: false, read: MatSelect }) select: MatSelect;

    bulkInvoiceNegotiationListPaginationFilterByType = bulkInvoiceNegotiationListPaginationFilterByType;

    BULK_INVOICE_NEGOTIATION_STATUS = BULK_INVOICE_NEGOTIATION_STATUS;

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
                    status: null,
                    q: null,
                },
                { emitEvent: false }
            );
            setTimeout(() => (this.input || this.select).focus(), 0);
        });

        this.subscription.add(sub1).add(sub2);
    }

    shouldRenderResetButton() {
        const { filter_by, q } = this.form.value;
        return !filter_by && !q;
    }

    onReset() {
        this.form.reset(undefined, { emitEvent: false });
        this._submit.emit(this.getFormValue());
    }

    getFormValue(): BulkInvoiceNegotiationListPaginationFilterPayload {
        const { filter_by, q } = this.form
            .value as BulkInvoiceNegotiationListFormValue;

        return {
            filter_by,
            q: isMoment(q) ? (q as Moment).toISOString() : q,
        };
    }
}
