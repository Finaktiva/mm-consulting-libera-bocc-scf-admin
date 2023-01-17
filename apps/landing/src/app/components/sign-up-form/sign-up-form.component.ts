import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordFormBase } from '@libera/base';
import { EMAIL_REGEX, NIT_REGEX } from '@libera/constants';
import { NitErrorStateMatcher } from '@libera/providers';
import { nonequalsvalidator } from '@libera/shared';
import { nitValidator, NitValidator } from '@libera/validators';
import { NgEzValidators } from '@ngez/core';
import { PasswordValidator } from 'libs/shared/src/lib/validators/password.validator';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sign-up-form',
    templateUrl: './sign-up-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent extends PasswordFormBase implements OnInit {
    errorStateMatcher = new NitErrorStateMatcher();

    private subscription = new Subscription();

    constructor(
        formBuilder: FormBuilder,
        validator: NitValidator,
        private cdr: ChangeDetectorRef
    ) {
        super();
        this.form = formBuilder.group(
            {
                email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
                businessName: ['', Validators.required],
                nit: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(13),
                        Validators.maxLength(13),
                        Validators.pattern(NIT_REGEX),
                        nitValidator,
                    ],
                    // validator.validateNotFound,
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
            { validators: [
                NgEzValidators.equals('password', 'confirmPassword'),
                nonequalsvalidator('email','password')
            ] }
        );
    }

    ngOnInit() {
        const subscription = this.form
            .get('nit')
            .statusChanges.subscribe(() => this.cdr.detectChanges());

        this.subscription.add(subscription);
    }

    getFormValue() {
        const { confirmPassword, ...rest } = this.form.value;
        return rest;
    }

    shouldRenderErrorIcon(): boolean {
        const nit = this.form.get('nit');

        return nit.hasError('found') || nit.hasError('somethingWentWrong');
    }

}
