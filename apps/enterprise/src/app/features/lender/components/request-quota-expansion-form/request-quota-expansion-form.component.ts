import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuotaForm } from '@libera/base';
import {
    AdjustmentRequestPayload,
    adjustmentRequestType,
} from '@libera/models/lender';

@Component({
    selector: 'request-quota-expansion-form',
    templateUrl: './request-quota-expansion-form.component.html',
})
export class RequestQuotaExpansionFormComponent extends QuotaForm {
    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getFormValue(): AdjustmentRequestPayload {
        return {
            ...super.getFormValue(),
            type: adjustmentRequestType.AMOUNT_UPGRADE,
        };
    }
}
