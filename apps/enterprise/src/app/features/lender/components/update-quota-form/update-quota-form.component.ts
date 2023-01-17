import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuotaForm } from '@libera/base';
import {
    AdjustmentRequestPayload,
    adjustmentRequestType,
} from '@libera/models/lender';

@Component({
    selector: 'update-quota-form',
    templateUrl: './update-quota-form.component.html',
})
export class UpdateQuotaFormComponent extends QuotaForm {
    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getFormValue(): AdjustmentRequestPayload {
        return {
            ...super.getFormValue(),
            type: adjustmentRequestType.PAYMENT,
        };
    }
}
