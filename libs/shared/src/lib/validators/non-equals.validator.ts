import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function nonequalsvalidator(valor1: string, valor2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const v1 = control.get(valor1);
        const v2 = control.get(valor2);
        return v1 && v2 && v1.value === v2.value ? { nonequalsvalidator: true } : null;
    }
}