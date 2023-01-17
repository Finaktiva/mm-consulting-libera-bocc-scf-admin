import {
    FormBuilder,
    FormArray,
    FormControl,
    AbstractControl,
} from '@angular/forms';
import { formatCurrency } from '@angular/common';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

export const isOneOf = function isOneOf(options: string[]) {
    return (value: string) => {
        return options.includes(value);
    };
};

export const mapToControl = function mapToControl(builder: FormBuilder) {
    return (values: any[]) => {
        return values.map(value => builder.control(value));
    };
};

export const pushOn = function pushOn(array: FormArray) {
    return (controls: FormControl[]) => {
        controls.forEach(c => array.push(c));
    };
};

export const parseNumber = function parseNumber(value: string) {
    const num = Number(value.replace(/[^\d\.]/g, ''));
    return isNaN(num)
        ? 0
        : formatCurrency(num, 'en', '', 'USD', '1.2-2').trim();
};

export const isTruthy = function isTruthy(value: any) {
    return !!value;
};

export const distinctOf = function distinctOf(origin: any) {
    return (value: any) => origin != value;
};

export const and = function and(...conditions: ((x: any) => boolean)[]) {
    return (value: any) => conditions.every(fn => fn(value));
};

export const parsePartialInputCurrency = function parsePartialInputCurrency(
    control: AbstractControl,
    source: Observable<any>
) {
    return (prop: string) =>
        source.pipe(
            map(payment => payment[prop]),
            filter(and(isTruthy, distinctOf(control.value[prop]))),
            map(parseNumber),
            tap(value =>
                control.patchValue({ [prop]: value }, { emitEvent: false })
            )
        );
};

export const parseInputCurrency = function parseInputCurrency(
    control: AbstractControl
) {
    return control.patchValue(parseNumber(control.value), { emitEvent: false });
};

export const currencyToNumber = function currencyToNumber(value: any) {
    const num = Number(value.replace(/[^\d\.]/g, ''));
    return isNaN(num) ? 0 : num;
};

export const unique = function unique(value: any, index: number, self: any[]) {
    return self.indexOf(value) === index;
};

export const not = function not(x: any) {
    return !x;
};
