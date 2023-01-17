import { PASSWORD_MAXLENGTH, PASSWORD_MINLENGTH } from '@libera/constants';
import { ConfirmPasswordErrorStateMatcher } from '@libera/providers';
import { FormBase } from '@mediomelon/ng-core';

export abstract class PasswordFormBase extends FormBase {
    shouldHidePassword = true;

    shouldHideConfirmPassword = true;

    confirmPasswordErrorStateMatcher = new ConfirmPasswordErrorStateMatcher();

    PASSWORD_MINLENGTH = PASSWORD_MINLENGTH;

    PASSWORD_MAXLENGTH = PASSWORD_MAXLENGTH;

    togglePassword() {
        this.shouldHidePassword = !this.shouldHidePassword;
    }

    toggleConfirmPassword() {
        this.shouldHideConfirmPassword = !this.shouldHideConfirmPassword;
    }
}
