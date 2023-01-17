import { Pipe, PipeTransform } from '@angular/core';
import { SALES_REGEX } from '@libera/constants';

@Pipe({
    name: 'sales',
})
export class SalesPipe implements PipeTransform {

    transform(sales: number): string {
        if (!sales && sales !== 0) return;
        return sales.toString().replace(SALES_REGEX, ".");
    }
}