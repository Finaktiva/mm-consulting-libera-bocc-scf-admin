import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FilterConfig, FILTER_TYPES } from './list-filter';

@Component({
    selector: 'list-filters',
    templateUrl: './list-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListFiltersComponent extends FormBase
    implements OnInit, OnDestroy {
    @Input() filters: any;

    @Input() filterConfig: FilterConfig;

    @ViewChild('input', { static: false, read: MatInput }) input: MatInput;
    @ViewChild('select', { static: false, read: MatSelect }) select: MatSelect;

    FILTER_TYPES = FILTER_TYPES;

    readonly defaultQueryName: string = 'q';

    private formKeys: string[];
    private queryFields: AbstractControl[] = [];
    private selectFields: AbstractControl[] = [];

    private subscription: Subscription;

    constructor(private formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            filter_by: [null, Validators.required],
            q: [null, Validators.required],
        });
    }

    ngOnInit() {
        if (this.filters)
            this.form.patchValue(this.filters, { emitEvent: false });

        const hasFieldName = this.has('fieldName');

        this.formKeys = this.filterConfig.filters
            .filter(hasFieldName)
            .map(f => f.fieldName);

        const getType = this.getProperty('type');

        this.filterConfig.filters.filter(hasFieldName).forEach(f => {
            this.form.addControl(f.fieldName, this.formBuilder.control(null));

            const control = this.form.get(f.fieldName);
            if (control) {
                this.queryFields.push(control);
            } else {
                this.selectFields.push(control);
            }
        });

        const filterBy = this.form.get('filter_by');

        const sub1 = this.form.valueChanges
            .pipe(debounceTime(500))
            .subscribe(() => this.onSubmit());

        const findFilterWith = this.findWith(
            this.filterConfig.filters,
            'renderWhenIs'
        );
        const enable = this.do('enable');
        const disable = this.do('disable');

        const sub2 = filterBy.valueChanges.subscribe(value => {
            this.form.patchValue({ q: '' }, { emitEvent: false });

            if (this.equals(getType(findFilterWith(value)), 'QUERY')) {
                this.queryFields.forEach(enable);
                this.selectFields.forEach(disable);
            } else {
                this.selectFields.forEach(enable);
                this.queryFields.forEach(disable);
            }

            setTimeout(() => (this.input || this.select).focus(), 0);
        });

        this.subscription = sub1.add(sub2);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onClear() {
        this.form.reset(undefined, { emitEvent: false });
        this._submit.emit(this.getFormValue());
    }

    get shouldRenderClean(): boolean {
        const value = this.form.value;
        return !value.filter_by || this.formKeys.some(k => !value[k]);
    }

    private findWith(a: any[], property: string) {
        return (x: any) => {
            return a.find(i => i[property] == x);
        };
    }

    private equals(a: any, b: any) {
        return a == b;
    }

    private do(action: string) {
        return (c: FormControl) => {
            c[action]();
        };
    }

    private getProperty(p: string) {
        return (o: any) => o[p];
    }

    private has(property: string) {
        return (o: any) => !!o[property];
    }
}
