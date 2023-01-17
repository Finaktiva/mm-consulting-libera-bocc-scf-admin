import { getCurrencySymbol } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencySymbol',
})
export class CurrencySymbolPipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private localeId: string) {}

    transform(code: string): string {
        return code ? getCurrencySymbol(code, 'narrow', this.localeId) : '';
    }
}
