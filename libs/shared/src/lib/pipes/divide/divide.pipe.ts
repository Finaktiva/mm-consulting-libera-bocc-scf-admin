import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'divide',
})
export class DividePipe implements PipeTransform {
    transform(dividend: number, divisor: number): number {
        return dividend / divisor;
    }
}
