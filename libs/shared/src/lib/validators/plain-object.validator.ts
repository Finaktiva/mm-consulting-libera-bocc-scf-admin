import { AbstractControl, ValidatorFn } from '@angular/forms';

import { isPlainObject } from '../utils';

export const plainObjectValidator: ValidatorFn = ({
    value,
}: AbstractControl) => {
    if (!value) return null;

    return isPlainObject(value) ? null : { plainObject: true };
};
