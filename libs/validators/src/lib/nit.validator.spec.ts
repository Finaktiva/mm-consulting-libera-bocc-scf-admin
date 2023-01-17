import { FormControl } from '@angular/forms';

import { nitValidator } from './nit.validator';

describe('NitValidator', () => {
    let control: FormControl;

    beforeEach(() => (control = new FormControl()));

    it('should pass validation', () => {
        control.setValue('900.876.256-2');
        expect(nitValidator(control)).toBe(null);
        control.setValue('910.876.256-9');
        expect(nitValidator(control)).toBe(null);
        control.setValue('910.876.756-1');
        expect(nitValidator(control)).toBe(null);
    });

    it('should return an error', () => {
        control.setValue('900.876.256-1');
        expect(nitValidator(control)).toEqual({ nit: true });
        control.setValue('910.876.256-4');
        expect(nitValidator(control)).toEqual({ nit: true });
        control.setValue('910.876.756-9');
        expect(nitValidator(control)).toEqual({ nit: true });
    });
});
