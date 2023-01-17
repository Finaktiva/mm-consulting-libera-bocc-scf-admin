import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidator {

    public static passwordValid(control: FormControl): ValidationResult {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        let hasSpecialCharacters = /[^\w\s]/.test(control.value);
        const valid = hasNumber && hasUpper && hasLower && hasSpecialCharacters;
        if (!valid) {
            return { passwordValid: true };
        }
        return null;
    }
}