import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { EnterpriseSector } from '@libera/models/catalog';
import { ENTERPRISE_TYPE } from '@libera/models/enterprise';
import {
    PayerListPaginationFilterByType,
    PayerListPaginationFilterPayload,
} from '@libera/models/payer';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'payer-list-filter-form',
    templateUrl: './payer-list-filter-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerListFilterFormComponent extends FormBase
    implements OnInit, OnDestroy {
    @Input() filters: PayerListPaginationFilterPayload;
    @Input() enterpriseSectors: EnterpriseSector[];

    @ViewChild(MatInput, { static: false }) input: MatInput;
    @ViewChild('select', { static: false }) select: MatSelect;

    PayerListPaginationFilterByType = PayerListPaginationFilterByType;
    ENTERPRISE_TYPE = ENTERPRISE_TYPE;

    private subscription = new Subscription();

    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            filter_by: [null, Validators.required],
            q: [null],
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
}
