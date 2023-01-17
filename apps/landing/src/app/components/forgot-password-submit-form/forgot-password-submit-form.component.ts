import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordFormBase } from '@libera/base';
import { CODE_LENGTH } from '@libera/constants';
import { nonequalsvalidator } from '@libera/shared';
import { NgEzValidators } from '@ngez/core';
import { PasswordValidator } from 'libs/shared/src/lib/validators/password.validator';

@Component({
    selector: 'forgot-password-submit-form',
    templateUrl: './forgot-password-submit-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordSubmitFormComponent extends PasswordFormBase {
    @Input() set payload({ email, code }: { email: string; code: string }) {
        if (email) {
            const emailControl = this.form.get('email');
            emailControl.setValue(email);
            emailControl.markAsTouched();
            if (emailControl.valid) emailControl.disable();
        }
        if (code) {
            const codeControl = this.form.get('code');
            codeControl.setValue(code);
            codeControl.markAsTouched();
            if (codeControl.valid) codeControl.disable();
        }
    }

    codeLength = CODE_LENGTH;

    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: [
                    '',[
                        Validators.required,
                        Validators.maxLength(this.PASSWORD_MAXLENGTH),
                        Validators.minLength(this.PASSWORD_MINLENGTH),
                        PasswordValidator.passwordValid
                    ]
                ],
                confirmPassword: ['', Validators.required],
                code: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(CODE_LENGTH),
                        Validators.maxLength(CODE_LENGTH),
                    ],
                ],
            },
            { validators: [
                NgEzValidators.equals('password', 'confirmPassword'),
                nonequalsvalidator('email','password')
            ] }
        );
    }

    getFormValue() {
        return this.form.getRawValue();
    }

}
