import { Injectable } from '@angular/core';
import { ApisService } from '@libera/api';
import { tap } from 'rxjs/operators';

import { DailyRatesQuery } from './daily-rates.query';
import { DailyRatesStore } from './daily-rates.store';

@Injectable({
    providedIn: 'root',
})
export class DailyRatesStoreService {
    constructor(
        private query: DailyRatesQuery,
        private store: DailyRatesStore,
        private apisService: ApisService
    ) {}

    fetchAll() {
        this.store.fetchAll();
        return this.apisService
            .getDailyRates()
            .pipe(
                tap(
                    payload => this.store.fetchAllSuccess(payload),
                    error => this.store.fetchAllError(error)
                )
            );
    }
}