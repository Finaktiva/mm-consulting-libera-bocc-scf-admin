import { OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import {
    currencyToNumber,
    parseInputCurrency,
} from '../../../shared/src/lib/utils/functional';

export class QuotaForm extends FormBase implements OnInit {
    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            quota: ['', [Validators.required, Validators.min(1)]],
            comments: null,
        });
    }

    ngOnInit() {}

    onBlur() {
        const control = this.form.get('quota');
        parseInputCurrency(control);
    }

    getFormValue() {
        const { comments, quota } = this.form.value;
        return {
            comments,
            quota: currencyToNumber(quota),
        };
    }
}
