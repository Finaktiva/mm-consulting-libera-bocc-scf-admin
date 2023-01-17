import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class NitErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
        control: FormControl | null,
        form: FormGroupDirective | NgForm | null
    ): boolean {
        const isSubmitted = form && form.submitted;
        return !!(
            control &&
            (control.hasError('notFound') ||
                control.hasError('found') ||
                control.hasError('somethingWentWrong') ||
                (control.invalid &&
                    (control.dirty || control.touched || isSubmitted)))
        );
    }
}
