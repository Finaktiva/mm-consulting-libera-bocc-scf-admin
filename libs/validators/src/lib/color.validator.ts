import { AbstractControl } from '@angular/forms';

export const colorValidator = (control: AbstractControl) => {
    const { value } = control;

    if (!value) return null;

    const element = new Option();
    element.style.color = value;

    return element.style.color ? null : { color: true };
};
