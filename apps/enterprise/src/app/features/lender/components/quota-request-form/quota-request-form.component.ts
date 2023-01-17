import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuotaForm } from '@libera/base';

@Component({
    selector: 'quota-request-form',
    templateUrl: './quota-request-form.component.html',
    styles: ['./quote-request-format.component.scss'],
})
export class QuotaRequestFormComponent extends QuotaForm {
    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }
}
