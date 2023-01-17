import { Injectable } from '@angular/core';
import { DailyRate } from '@libera/models/catalog';
import { EntityQuery } from '@mediomelon/ng-core';
import { DailyRatesStore } from './daily-rates.store';

@Injectable({
    providedIn: 'root',
})
export class DailyRatesQuery extends EntityQuery<DailyRate> {
    constructor(store: DailyRatesStore) {
        super(store);
    }
}