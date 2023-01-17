import { Injectable } from '@angular/core';
import { CountryCallingCode } from '@libera/models/catalog';
import { EntityQuery } from '@mediomelon/ng-core';

import { CountryCallingCodeStore } from './country-calling-code.store';

@Injectable({
    providedIn: 'root',
})
export class CountryCallingCodeQuery extends EntityQuery<CountryCallingCode> {
    constructor(store: CountryCallingCodeStore) {
        super(store);
    }
}
