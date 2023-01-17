import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
    AvailableEnterprise,
    AvailableEnterpriseType,
    AVAILABLE_ENTERPRISE_TYPE,
} from '@libera/models/enterprise';
import { plainObjectValidator } from '@libera/shared';
import { FormBase } from '@mediomelon/ng-core';
import { merge, Observable, of, Subscription } from 'rxjs';
import {
    catchError,
    debounceTime,
    filter,
    mapTo,
    switchMap,
} from 'rxjs/operators';
import { AvailableEnterpriseQuery } from '../../state/available-enterprise.query';
import { AvailableEnterpriseStore } from '../../state/available-enterprise.store';
import { AvailableEnterpriseStoreService } from '../../state/available-enterprise.store.service';

@Component({
    selector: 'enterprise-form',
    templateUrl: './enterprise-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        AvailableEnterpriseStoreService,
        AvailableEnterpriseQuery,
        AvailableEnterpriseStore,
    ],
})
export class EnterpriseFormComponent extends FormBase implements OnInit {
    @Input() type: AvailableEnterpriseType;

    @Output() cancel = new EventEmitter();

    isLoading$: Observable<boolean> = this.query.selectLoading();

    error$: Observable<any> = this.query.selectError();

    enterprises$: Observable<AvailableEnterprise[]>;

    TYPE = AVAILABLE_ENTERPRISE_TYPE;

    private subscription = new Subscription();

    constructor(
        formBuilder: FormBuilder,
        private query: AvailableEnterpriseQuery,
        private storeService: AvailableEnterpriseStoreService
    ) {
        super();

        this.form = formBuilder.group({
            enterprise: [null, [Validators.required, plainObjectValidator]],
        });
    }

    ngOnInit() {
        const enterpriseValueChanges$ = this.form.get('enterprise')
            .valueChanges;

        this.enterprises$ = merge(
            enterpriseValueChanges$.pipe(mapTo([])),
            this.query.selectEntities()
        );

        const subscription = enterpriseValueChanges$
            .pipe(
                debounceTime(500),
                filter(
                    value =>
                        value && typeof value == 'string' && value.length >= 5
                ),
                switchMap(value =>
                    this.storeService
                        .find(value, this.type)
                        .pipe(catchError(() => of([])))
                )
            )
            .subscribe();

        this.subscription.add(subscription);
    }

    onCancel() {
        this.cancel.emit();
    }

    displayWith(value: AvailableEnterprise): string {
        return value ? value.enterpriseName : '';
    }

    getFormValue() {
        const { enterprise } = this.form.value;
        return enterprise;
    }
}
