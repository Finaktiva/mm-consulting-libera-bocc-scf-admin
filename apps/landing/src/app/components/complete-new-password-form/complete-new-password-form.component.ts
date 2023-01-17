import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordFormBase } from '@libera/base';
import { nonequalsvalidator } from '@libera/shared';
import { NgEzValidators } from '@ngez/core';
import { PasswordValidator } from 'libs/shared/src/lib/validators/password.validator';

@Component({
    selector: 'complete-new-password-form',
    templateUrl: './complete-new-password-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleteNewPasswordFormComponent extends PasswordFormBase
    implements OnInit {
    @Input() set email(email: string) {
        if (email) {
            this.form.patchValue({ email }, { emitEvent: false });
        }
    }

    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group(
            {
                email: [
                    { value: '', disabled: true },
                    [Validators.required, Validators.email],
                ],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.maxLength(this.PASSWORD_MAXLENGTH),
                        Validators.minLength(this.PASSWORD_MINLENGTH),
                        PasswordValidator.passwordValid
                    ]
                ],
                confirmPassword: ['', Validators.required],
            },
            {
                validators: [NgEzValidators.equals(
                    'password',
                    'confirmPassword'
                ),nonequalsvalidator('email','password')],
            }
        );
    }


    ngOnInit() {}
}
