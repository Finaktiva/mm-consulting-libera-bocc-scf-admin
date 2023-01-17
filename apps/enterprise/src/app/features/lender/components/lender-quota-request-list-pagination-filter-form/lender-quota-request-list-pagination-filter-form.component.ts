import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { LenderQuotaRequestListPaginationFilterByType, LenderQuotaRequestListPaginationFilterPayload, LENDER_QUOTA_REQUEST_STATUS } from '@libera/models/lender-quota-request';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'lender-quota-request-list-pagination-filter-form',
    templateUrl:
        './lender-quota-request-list-pagination-filter-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LenderQuotaRequestListPaginationFilterFormComponent
    extends FormBase
    implements OnInit, OnDestroy {
    @Input() filters: LenderQuotaRequestListPaginationFilterPayload;

    @ViewChild(MatInput, { static: false }) input: MatInput;

    LenderQuotaRequestListPaginationFilterByType = LenderQuotaRequestListPaginationFilterByType;

    private subscription = new Subscription();

    LENDER_QUOTA_REQUEST_STATUS = LENDER_QUOTA_REQUEST_STATUS;

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

    shouldRenderTextInput(): boolean {
        const filterBy = this.filterBy;
        return filterBy == LenderQuotaRequestListPaginationFilterByType.enterpriseName;
    }

    shouldRenderSelect(): boolean {
        const filterBy = this.filterBy;
        return filterBy == LenderQuotaRequestListPaginationFilterByType.status;
    }
}
