import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'extract',
    pure: true,
})
export class ExtractPipe implements PipeTransform {
    transform(from: any[], value: any, key: string): any | undefined {
        if (!from.length) return null;
        return from.find(x => x[key] == value);
    }
}
