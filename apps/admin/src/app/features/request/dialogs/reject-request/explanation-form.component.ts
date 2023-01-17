import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'explanation-form',
    templateUrl: './explanation-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplanationFormComponent extends FormBase {
    constructor(formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group({
            explanation: ['', Validators.required],
        });
    }

    getFormValue() {
        return this.form.value.explanation;
    }
}
