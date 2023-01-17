import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { EnterpriseService } from '@libera/api';
import { of } from 'rxjs';
import { catchError, map, mapTo } from 'rxjs/operators';

export const nitValidator = (control: AbstractControl) => {
    const { value } = control;

    if (!value) return null;

    const digits = (value as string).replace(/\D/g, '');

    if (digits.length != 10) return null;

    let verifier =
        41 * parseInt(digits[0]) +
        37 * parseInt(digits[1]) +
        29 * parseInt(digits[2]) +
        23 * parseInt(digits[3]) +
        19 * parseInt(digits[4]) +
        17 * parseInt(digits[5]) +
        13 * parseInt(digits[6]) +
        7 * parseInt(digits[7]) +
        3 * parseInt(digits[8]);

    verifier = verifier % 11;

    if (verifier >= 2) verifier = 11 - verifier;

    return verifier == parseInt(digits[9]) ? null : { nit: true };
};

@Injectable({
    providedIn: 'root',
})
export class NitValidator {
    constructor(private enterpriseService: EnterpriseService) {
        this.validateNotFound = this.validateNotFound.bind(this);
        this.validateFound = this.validateFound.bind(this);
    }

    validateFound(control: AbstractControl) {
        const { value } = control;
        return this.enterpriseService.findByNit(value).pipe(
            mapTo(null),
            catchError((error: HttpErrorResponse) =>
                of(
                    error.status == 409
                        ? { notFound: true }
                        : { somethingWentWrong: true }
                )
            )
        );
    }

    validateNotFound(control: AbstractControl) {
        const { value } = control;
        return this.enterpriseService.findByNit(value).pipe(
            map(payload => (payload ? { found: true } : null)),
            catchError((error: HttpErrorResponse) =>
                of(error.status == 409 ? null : { somethingWentWrong: true })
            )
        );
    }
}
