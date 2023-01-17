import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPaymentFormPayload } from '@libera/models/lender';
import {
    whitespaceValidator,
    parseInputCurrency,
    currencyToNumber,
} from '@libera/shared';
import { FormBase } from '@mediomelon/ng-core';
import { NgEzValidators } from '@ngez/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'confirm-payment-form',
    templateUrl: './confirm-payment-form.component.html',
    styleUrls: ['./confirm-payment-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPaymentFormComponent extends FormBase
    implements OnInit, OnDestroy {
    today = new Date();

    private subscription: Subscription;

    constructor(formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group({
            file: [null, [NgEzValidators.fileType('image/*, .pdf')]],
            comments: ['', [whitespaceValidator]],
            effectivePaymentDate: [null, Validators.required],
            effectivePaymentAmount: [
                null,
                [Validators.required, Validators.min(1)],
            ],
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onBlur() {
        const control = this.form.get('effectivePaymentAmount');
        parseInputCurrency(control);
    }

    getFormValue(): ConfirmPaymentFormPayload {
        const { effectivePaymentDate, effectivePaymentAmount, ...rest } = this
            .form.value as {
            file: File;
            comments: string;
            effectivePaymentDate: moment.Moment;
            effectivePaymentAmount: string;
        };

        return {
            ...rest,
            effectivePaymentDate: effectivePaymentDate.toISOString(),
            effectivePaymentAmount: currencyToNumber(effectivePaymentAmount),
        };
    }
}
