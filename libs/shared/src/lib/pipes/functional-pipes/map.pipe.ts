import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'map',
    pure: true,
})
export class MapPipe implements PipeTransform {
    transform(from: any[], property: string): any {
        return from.map(x => x[property]);
    }
}
