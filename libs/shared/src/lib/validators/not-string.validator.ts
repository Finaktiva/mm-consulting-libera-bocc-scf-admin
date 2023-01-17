import { AbstractControl, ValidatorFn } from '@angular/forms';

import { isString } from '../utils';

export const notStringValidator: ValidatorFn = ({ value }: AbstractControl) => {
    if (!value) return null;

    return !isString(value) ? null : { notString: true };
};
