import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: true,
})
export class FilterPipe implements PipeTransform {
    transform(from: any[], expectedValue: any, property?: any): any {
        if (!from.length) return [];
        if (property) return from.filter(x => x[property] == expectedValue);
        return from.filter(x => x == expectedValue);
    }
}
