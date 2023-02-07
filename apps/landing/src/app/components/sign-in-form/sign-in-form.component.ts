import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordFormBase } from '@libera/base';

@Component({
    selector: 'sign-in-form',
    templateUrl: './sign-in-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent extends PasswordFormBase {
    @Output() onFederatedSignIn = new EventEmitter();

    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    federatedSignIn() {
        this.onFederatedSignIn.emit();
    }
}
