import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AvailableEnterprise } from '@libera/models/enterprise';
import { isPlainObject, plainObjectValidator } from '@libera/shared';
import { FormBase } from '@mediomelon/ng-core';
import { NgEzValidators } from '@ngez/core';
import { BehaviorSubject, merge, Observable, of, Subscription } from 'rxjs';
import {
    catchError,
    debounceTime,
    filter,
    map,
    mapTo,
    switchMap,
    tap,
} from 'rxjs/operators';

import { AvailableEnterpriseQuery } from '../../state/available-enterprise.query';
import { AvailableEnterpriseStoreService } from '../../state/available-enterprise.store.service';
import { LenderInvoiceFundingRequestFormPayload } from '@libera/models/lender';

@Component({
    selector: 'funding-request-form',
    templateUrl: './funding-request-form.component.html',
})
export class FundingRequestFormComponent
    extends FormBase<LenderInvoiceFundingRequestFormPayload>
    implements OnInit, OnDestroy {
    filter$: Observable<AvailableEnterprise[]>;

    error$: Observable<any> = this.query.selectError();

    hasLoaded$ = this.query.selectLoaded();

    isLoading$ = this.query.selectLoading();

    private subscription = new Subscription();

    hasSelectedLender$: Observable<boolean>;

    constructor(
        formBuilder: FormBuilder,
        private availableEnterpriseStoreService: AvailableEnterpriseStoreService,
        private query: AvailableEnterpriseQuery
    ) {
        super();
        this.form = formBuilder.group({
            lender: [null, [Validators.required, plainObjectValidator]],
            paymentInstructions: [null, Validators.required],
            file: [null, [NgEzValidators.fileType('.pdf,.png,.jpg,.zip,.rar')]],
        });
    }

    ngOnInit() {
        const lenderValueChanges$ = this.form.get('lender').valueChanges;

        this.hasSelectedLender$ = lenderValueChanges$.pipe(
            map(value => isPlainObject(value))
        );

        this.filter$ = merge(
            lenderValueChanges$.pipe(mapTo([])),
            this.query.selectEntities()
        );

        const subscription = lenderValueChanges$
            .pipe(
                debounceTime(500),
                filter(value => value.length >= 5),
                switchMap(value =>
                    this.availableEnterpriseStoreService
                        .find(value, 'FUNDING')
                        .pipe(catchError(() => of([])))
                )
            )
            .subscribe();

        this.subscription.add(subscription);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getFormValue() {
        const value = this.form.getRawValue();

        return {
            lenderId: value.lender.id,
            paymentInstructions: value.paymentInstructions,
            file: value.file,
        };
    }

    displayFn(lender: AvailableEnterprise) {
        return lender ? lender.enterpriseName : lender;
    }
}
