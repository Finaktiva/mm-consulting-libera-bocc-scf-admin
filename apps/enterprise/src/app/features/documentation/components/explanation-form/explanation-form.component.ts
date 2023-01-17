import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'explanation-form',
    templateUrl: './explanation-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplanationFormComponent extends FormBase {
    @Input() placeholder: string;

    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            explanation: ['', [Validators.required, Validators.maxLength(150)]],
        });
    }

    getFormValue() {
        return this.form.value.explanation;
    }
}
