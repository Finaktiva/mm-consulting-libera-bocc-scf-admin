import { AbstractControl, ValidatorFn } from '@angular/forms';
import { RATE_REGEX } from '@libera/constants';

export const numberDecimalsValidate: ValidatorFn = ({
    value,
}: AbstractControl) => {
    if (!value) return null;
    return RATE_REGEX.test(value) ? null : { validPercent: true };
};