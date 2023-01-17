import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
    ENTERPRISE_MODULES,
    ENTERPRISE_STATUS,
    ENTERPRISE_USER_FILTER_FIELDS,
    EnterpriseUserFilterPayload,
} from '@libera/models/enterprise';
import { NeverShowErrorStateMatcher } from '@libera/providers';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'user-list-filter-form',
    templateUrl: './user-list-filter-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: ErrorStateMatcher, useClass: NeverShowErrorStateMatcher },
    ],
})
export class UserListFilterFormComponent extends FormBase
    implements OnInit, OnDestroy {
    @Input() set filters(filters: EnterpriseUserFilterPayload) {
        if (filters) {
            this.form.patchValue(filters, { emitEvent: false });
        }
    }

    ENTERPRISE_MODULES = ENTERPRISE_MODULES;

    ENTERPRISE_STATUS = ENTERPRISE_STATUS;

    ENTERPRISE_USER_FILTER_FIELDS = ENTERPRISE_USER_FILTER_FIELDS;

    private subscription = new Subscription();

    constructor(formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group({
            filter_by: [null, Validators.required],
            q: [null, Validators.required],
        });
    }

    ngOnInit() {
        const sub1 = this.form
            .get('filter_by')
            .valueChanges.subscribe(() =>
                this.form.get('q').setValue(null, { emitEvent: false })
            );

        const sub2 = this.form.valueChanges.subscribe(() => this.submit());

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
}
