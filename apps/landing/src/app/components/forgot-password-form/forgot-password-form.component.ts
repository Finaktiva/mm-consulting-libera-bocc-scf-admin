import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'forgot-password-form',
    templateUrl: './forgot-password-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordFormComponent extends FormBase {
    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    ngOnInit() {}
}
