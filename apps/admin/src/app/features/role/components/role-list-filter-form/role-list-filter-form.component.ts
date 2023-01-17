import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { RoleFilterPayload, ROLE_FILTER_BY } from '@libera/models/role';
import { NeverShowErrorStateMatcher } from '@libera/providers';
import { FormBase } from '@mediomelon/ng-core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
    selector: 'role-list-filter-form',
    templateUrl: './role-list-filter-form.component.html',
    providers: [
        { provide: ErrorStateMatcher, useClass: NeverShowErrorStateMatcher },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListFilterFormComponent extends FormBase implements OnInit, OnDestroy {

    ROLE_FILTER_BY = ROLE_FILTER_BY;

    @Input() filters: RoleFilterPayload;

    @ViewChild('select', { static: false }) select: MatSelect;

    private subscription = new Subscription();

    constructor(formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group({
            filter_by: [null, Validators.required],
            q: [null, Validators.required],
        });
    }

    ngOnInit() {
        if (this.filters) this.form.patchValue(this.filters);
        
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

    shouldRenderDatepicker(){
        const { filter_by } = this.form.value;
        return (
            filter_by == ROLE_FILTER_BY.CREATION_DATE || filter_by == ROLE_FILTER_BY.EDITION_DATE
        );
    }

    shouldRenderTextInput(){
        const { filter_by } = this.form.value;
        return (
            filter_by == ROLE_FILTER_BY.ACRONYM || filter_by == ROLE_FILTER_BY.DESCRIPTION
        );
    }

    getFormValue(): Partial<any> {
        const { filter_by, q } = this.form.value;
        if (!q || !this.shouldRenderDatepicker())
            return this.form.value;

        const asIsoString = (q as moment.Moment).toISOString();

        return {
            filter_by,
            q: asIsoString,
        };
    }
}
