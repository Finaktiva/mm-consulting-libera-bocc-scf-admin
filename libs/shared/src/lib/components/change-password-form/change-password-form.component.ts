import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordFormBase } from '@libera/base';
import { NgEzValidators } from '@ngez/core';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
    selector: 'change-password-form',
    templateUrl: './change-password-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordFormComponent extends PasswordFormBase {
    shouldHideOldPassword = true;

    constructor(formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group(
            {
                oldPassword: ['', [
                    Validators.required,
                    Validators.maxLength(this.PASSWORD_MAXLENGTH),
                    Validators.minLength(this.PASSWORD_MINLENGTH),
                    PasswordValidator.passwordValid
                ]],
                newPassword: [
                    '',[
                        Validators.required,
                        Validators.maxLength(this.PASSWORD_MAXLENGTH),
                        Validators.minLength(this.PASSWORD_MINLENGTH),
                        PasswordValidator.passwordValid
                    ]
                ],
                confirmPassword: ['', Validators.required],
            },
            {
                validators: NgEzValidators.equals(
                    'newPassword',
                    'confirmPassword'
                ),
            }
        );
    }

    toggleOldPassword() {
        this.shouldHideOldPassword = !this.shouldHideOldPassword;
    }
}
