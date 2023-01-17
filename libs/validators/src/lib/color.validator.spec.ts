import { FormControl } from '@angular/forms';

import { colorValidator } from './color.validator';

describe('ColorValidator', () => {
    let control: FormControl;

    beforeEach(() => (control = new FormControl()));

    it('should pass validation', () => {
        control.setValue('red');
        expect(colorValidator(control)).toBe(null);
        control.setValue('#fff');
        expect(colorValidator(control)).toBe(null);
        control.setValue('#000000');
        expect(colorValidator(control)).toBe(null);
    });

    it('should return an error', () => {
        control.setValue('reds');
        expect(colorValidator(control)).toEqual({ color: true });
        control.setValue('#f2f2ff2');
        expect(colorValidator(control)).toEqual({ color: true });
    });
});
