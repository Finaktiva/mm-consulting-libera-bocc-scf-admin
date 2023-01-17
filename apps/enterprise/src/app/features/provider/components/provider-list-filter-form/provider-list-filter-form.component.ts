import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { EnterpriseProviderFilterPayload } from '@libera/models/enterprise';
import { NeverShowErrorStateMatcher } from '@libera/providers';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'provider-list-filter-form',
    templateUrl: './provider-list-filter-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: ErrorStateMatcher, useClass: NeverShowErrorStateMatcher },
    ],
})
export class ProviderListFilterFormComponent extends FormBase
    implements OnInit, OnDestroy {
    @Input() filters: EnterpriseProviderFilterPayload;

    @ViewChild(MatInput, { static: false }) input: MatInput;
    @ViewChild('select', { static: false }) select: MatSelect;

    private subscription = new Subscription();

    constructor(private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        const filter_by = this.filters ? this.filters.filter_by : null;

        const status = this.filters ? this.filters.status : null;

        const shouldDisableStatus = filter_by != 'STATUS';

        const q = this.filters ? this.filters.q : null;

        const shouldDisableQuery =
            filter_by != 'ENTERPRISE_NAME' && filter_by != 'NIT';

        this.form = this.formBuilder.group({
            filter_by: [filter_by, Validators.required],
            status: [
                { value: status, disabled: shouldDisableStatus },
                Validators.required,
            ],
            q: [
                { value: q, disabled: shouldDisableQuery },
                Validators.required,
            ],
        });

        const sub1 = this.form
            .get('filter_by')
            .valueChanges.subscribe(value => {
                this.form.patchValue(
                    {
                        status: null,
                        q: null,
                    },
                    { emitEvent: false }
                );

                if (value == 'STATUS') {
                    this.form.get('status').enable();
                    this.form.get('q').disable();
                } else {
                    this.form.get('q').enable();
                    this.form.get('status').disable();
                }

                setTimeout(() => {
                    if (this.input) this.input.focus();
                    if (this.select) this.select.focus();
                }, 0);
            });

        const sub2 = this.form.valueChanges
            .pipe(debounceTime(500))
            .subscribe(() => this.submit());

        this.subscription.add(sub1).add(sub2);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    shouldRenderStatusSelector() {
        return this.form.get('filter_by').value == 'STATUS';
    }

    shouldRenderQueryInput() {
        const value = this.form.get('filter_by').value;
        return value == 'ENTERPRISE_NAME' || value == 'NIT';
    }

    shouldRenderResetButton() {
        const { filter_by, q, status } = this.form.value;
        return !filter_by && (!q || !status);
    }

    onReset() {
        this.form.reset(undefined, { emitEvent: false });
        this._submit.emit(this.getFormValue());
    }
}
