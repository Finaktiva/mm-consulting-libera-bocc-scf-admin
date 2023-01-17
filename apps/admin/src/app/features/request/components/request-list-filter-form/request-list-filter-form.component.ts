import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
    ENTERPRISE_REQUEST_PAGINATION_FILTER_BY,
    ENTERPRISE_REQUEST_STATUS,
    EnterpriseRequestPaginationFilters,
} from '@libera/models/enterprise-request';
import { NeverShowErrorStateMatcher } from '@libera/providers';
import { FormBase } from '@mediomelon/ng-core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'request-list-filter-form',
    templateUrl: './request-list-filter-form.component.html',
    providers: [
        { provide: ErrorStateMatcher, useClass: NeverShowErrorStateMatcher },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestListFilterFormComponent extends FormBase
    implements OnInit, OnDestroy {
    @Input() filters: EnterpriseRequestPaginationFilters;

    ENTERPRISE_REQUEST_PAGINATION_FILTER_BY = ENTERPRISE_REQUEST_PAGINATION_FILTER_BY;

    ENTERPRISE_REQUEST_STATUS = ENTERPRISE_REQUEST_STATUS;

    private subscription = new Subscription();

    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            filter_by: [null],
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

            if (value == ENTERPRISE_REQUEST_PAGINATION_FILTER_BY.STATUS) {
                status.enable();
                query.disable();
            } else if (
                value ==
                    ENTERPRISE_REQUEST_PAGINATION_FILTER_BY.ENTERPRISE_NAME ||
                value == ENTERPRISE_REQUEST_PAGINATION_FILTER_BY.NIT ||
                value == ENTERPRISE_REQUEST_PAGINATION_FILTER_BY.DATE
            ) {
                status.disable();
                query.enable();
            }
        });

        this.subscription.add(sub1).add(sub2);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    shouldRender() {
        const { filter_by, q } = this.form.value;
        return !filter_by && !q;
    }

    onClear() {
        this.form.reset(undefined, { emitEvent: false });
        this._submit.emit(this.getFormValue());
    }

    getFormValue() {
        const { filter_by, q } = this.form.value;

        if (!q || filter_by != ENTERPRISE_REQUEST_PAGINATION_FILTER_BY.DATE)
            return this.form.value;

        const asIsoString = (q as moment.Moment).toISOString();

        return {
            filter_by,
            q: asIsoString,
        };
    }
}
