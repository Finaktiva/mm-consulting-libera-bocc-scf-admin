import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NEGOTIATION_DISCOUNT_TYPE } from '@libera/models/shared';
import { FormBase } from '@mediomelon/ng-core';
import * as moment from 'moment';

@Component({
    selector: 'negotiation-form',
    templateUrl: './negotiation-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NegotiationFormComponent extends FormBase {
    @Input() showActions: boolean;

    @Output() cancel = new EventEmitter();

    today = moment().add(1, 'days');

    NEGOTIATION_DISCOUNT_TYPE = NEGOTIATION_DISCOUNT_TYPE;

    constructor(formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group({
            discountDueDate: [null, Validators.required],
            expectedPaymentDate: [null, Validators.required],
            discountType: [null, Validators.required],
            percentage: [
                null,
                [Validators.required, Validators.min(0), Validators.max(99)],
            ],
        });
    }

    onCancel() {
        this.cancel.emit();
    }
}
