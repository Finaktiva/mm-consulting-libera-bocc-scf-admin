import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { USER_FILTER_BY, USER_STATUS, UserPaginationFilterPayload, UserRole } from '@libera/models/user';
import { NeverShowErrorStateMatcher } from '@libera/providers';
import { UserRolesService } from '@libera/state';
import { FormBase } from '@mediomelon/ng-core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'user-list-filter-form',
    templateUrl: './user-list-filter-form.component.html',
    providers: [
        { provide: ErrorStateMatcher, useClass: NeverShowErrorStateMatcher },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListFilterFormComponent extends FormBase implements OnInit {
    @Input() filters: UserPaginationFilterPayload;

    USER_FILTER_BY = USER_FILTER_BY;

    USER_STATUS = USER_STATUS;

    roles:UserRole[]


    @ViewChild('select', { static: false }) select: MatSelect;

    private subscription = new Subscription();

    constructor(formBuilder: FormBuilder, private userRoleServices: UserRolesService,) {
        super();

        this.form = formBuilder.group({
            filter_by: [null, Validators.required],
            q: [null, Validators.required],
        });
    }

    ngOnInit() {
        if (this.filters) this.form.patchValue(this.filters);

        const sub1 = this.form.get('filter_by').valueChanges.subscribe(() => {
            this.form.patchValue(
                {
                    q: null,
                },
                { emitEvent: false }
            );
        });

        const sub2 = this.form.valueChanges.pipe(debounceTime(500))
        .subscribe(() => this.onSubmit());

        this.userRoleServices.fetchAll('LIBERA_USER').subscribe(data => {
            this.roles = data
        })

        this.subscription.add(sub1).add(sub2);
    }

    shouldRender() {
        const { filter_by, q } = this.form.value;
        return !filter_by && !q;
    }

    onClear() {
        this.form.reset(undefined, { emitEvent: false });
        this._submit.emit(this.getFormValue());
    }

    shouldRenderTextInput(){
        const { filter_by } = this.form.value;
        return (
            filter_by == USER_FILTER_BY.EMAIL || filter_by == USER_FILTER_BY.FULL_NAME
        );
    }

    shouldRenderDatepicker(){
        const { filter_by } = this.form.value;
        return (
            filter_by == USER_FILTER_BY.VINCULATION_DATE 
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
