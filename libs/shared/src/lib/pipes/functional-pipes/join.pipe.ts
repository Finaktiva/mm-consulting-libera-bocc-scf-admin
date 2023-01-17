import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join',
    pure: true,
})
export class JoinPipe implements PipeTransform {
    transform(from: any[], separator: string): any {
        return from.join(separator);
    }
}
