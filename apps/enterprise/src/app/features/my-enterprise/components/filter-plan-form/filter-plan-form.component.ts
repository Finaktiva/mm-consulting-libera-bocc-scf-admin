import { ChangeDetectionStrategy, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { BankRegions, PlanFilterFields, PlanFiltersPayload } from '@libera/models/catalog';
import { EnterpriseFilterFields, ProgramFiltersPayload } from '@libera/models/enterprise';
import { NeverShowErrorStateMatcher } from '@libera/providers';
import { FormBase } from '@mediomelon/ng-core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

const filtersWithQueryInput = [
    PlanFilterFields.TYPE,
    PlanFilterFields.STATUS,
    PlanFilterFields.DESCRIPTION,
    PlanFilterFields.PROVIDER,
    PlanFilterFields.DOCUMENT_NUMBER,
];

@Component({
    selector: 'filter-plan-form',
    templateUrl: './filter-plan-form.component.html',
    providers: [
        { provide: ErrorStateMatcher, useClass: NeverShowErrorStateMatcher },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPlanFormComponent
    extends FormBase<Partial<PlanFiltersPayload>>
    implements OnDestroy {
    @Input() set filters(filters: PlanFiltersPayload) {
        if (filters) {
            this.form.patchValue(filters, { emitEvent: false });
        }
    }

    @ViewChild(MatInput, { static: false }) input: MatInput;

    private subscription = new Subscription();

    constructor(formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group({
            filter_by: ['', Validators.required],
            q: ['', Validators.required],
        });

        const sub1 = this.form.valueChanges
            .pipe(debounceTime(1000))
            .subscribe(() => {
                this.onSubmit()
            });

        const sub2 = this.form
            .get('filter_by')
            .valueChanges.subscribe(filter => {
                this.form.get('q').setValue('', { emitEvent: false });

                if (this.isFieldWithQueryInput(filter)){
                    this.form.get('q').enable();
                }else return this.form.get('q').disable();
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

    getFormValue(): Partial<PlanFiltersPayload> {
        return this.form.value;
    }

    shouldRenderQueryInput() {
        const { filter_by } = this.form.value;

        return this.isFieldWithQueryInput(filter_by);
    }

    private isFieldWithQueryInput(filter) {
        return filtersWithQueryInput.includes(filter);
    }

}
