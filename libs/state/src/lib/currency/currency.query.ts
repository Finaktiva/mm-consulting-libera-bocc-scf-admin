import { Injectable } from '@angular/core';
import { Currency } from '@libera/models/catalog';
import { EntityQuery } from '@mediomelon/ng-core';

import { CurrencyStore } from './currency.store';

@Injectable({
    providedIn: 'root',
})
export class CurrencyQuery extends EntityQuery<Currency> {
    constructor(store: CurrencyStore) {
        super(store);
    }
}
