import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
} from '@angular/core';
import { ProviderPayment } from '@libera/models/provider';
import { FormBase } from '@mediomelon/ng-core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'payment-request-form',
    templateUrl: './payment-request-form.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentRequestFormComponent extends FormBase implements OnInit {
    @Input() payment: ProviderPayment;

    @Input() currencyCode: string;

    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            effectivePaymentDate: [{ value: '', disabled: true }],
            effectivePaymentAmount: [{ value: '', disabled: true }],
        });
    }

    ngOnInit() {
        if (this.payment) this.form.patchValue(this.payment);
    }
}
