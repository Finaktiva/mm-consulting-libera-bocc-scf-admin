import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NUMBER_TEST_REGEX } from '@libera/constants';

export const numberGreaterThanZero: ValidatorFn = ({
    value,
}: AbstractControl) => {
    if (!NUMBER_TEST_REGEX.test(value)) return null;
    return +value > 0 ? null : { greaterThanZero: true };
};