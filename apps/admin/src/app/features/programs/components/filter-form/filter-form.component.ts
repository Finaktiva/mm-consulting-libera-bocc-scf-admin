import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { BankRegions } from '@libera/models/catalog';
import { EnterpriseFilterFields, ProgramFiltersPayload } from '@libera/models/enterprise';
import { NeverShowErrorStateMatcher } from '@libera/providers';
import { FormBase } from '@mediomelon/ng-core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

const filtersWithQueryInput = [
    EnterpriseFilterFields.NIT,
    EnterpriseFilterFields.DATE,
    EnterpriseFilterFields.ENTERPRISE_NAME,
    EnterpriseFilterFields.REGION,
];

const isFieldWithoutQueryInput = [
    EnterpriseFilterFields.MODULE,
    EnterpriseFilterFields.STATUS,
]

@Component({
    selector: 'filter-form',
    templateUrl: './filter-form.component.html',
    providers: [
        { provide: ErrorStateMatcher, useClass: NeverShowErrorStateMatcher },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterFormComponent
    extends FormBase<Partial<ProgramFiltersPayload>>
    implements OnDestroy {
    @Input() set filters(filters: ProgramFiltersPayload) {
        if (filters) {
            this.form.patchValue(filters, { emitEvent: false });
        }
    }

    @Input() bankRegions: BankRegions[];

    @Output() status = new EventEmitter();

    @ViewChild(MatInput, { static: false }) input: MatInput;

    private subscription = new Subscription();

    constructor(formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group({
            filter_by: ['', Validators.required],
            q: ['', Validators.required],
            documentType: ['', Validators.required],
            module: ['', Validators.required],
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
                this.form.get('documentType').setValue('', { emitEvent: false });
                this.form.get('module').setValue('', { emitEvent: false });

                if (this.isFieldWithQueryInput(filter)){
                    this.form.get('q').enable();
                }else this.form.get('q').disable();

                if (filter === "NIT") {
                    this.form.get('documentType').enable();
                } else {
                    this.form.get('documentType').disable();
                }

                if (filter === "MODULE") {
                    this.form.get('module').enable();
                } else {
                    this.form.get('module').disable();
                }

                setTimeout(() => this.input ? this.input.focus() : null, 0);
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

    getFormValue(): Partial<ProgramFiltersPayload> {
        const { filter_by, q } = this.form.value;
        if (!q || filter_by != EnterpriseFilterFields.DATE)
            return this.form.value;

        const asIsoString = (q as moment.Moment).toISOString();

        return {
            filter_by,
            q: asIsoString,
        };
    }

    shouldRenderQueryInput() {
        const { filter_by } = this.form.value;

        return this.isFieldWithQueryInput(filter_by);
    }

    private isFieldWithQueryInput(filter) {
        return filtersWithQueryInput.includes(filter);
    }

    shouldRenderWithoutQueryInput() {
        const { filter_by } = this.form.value;

        return this.isFieldWithoutQueryInput(filter_by);
    }

    private isFieldWithoutQueryInput(filter) {
        return isFieldWithoutQueryInput.includes(filter);
    }

    changeStatus(event) {
        this.status.emit(event.value);
    }
}
