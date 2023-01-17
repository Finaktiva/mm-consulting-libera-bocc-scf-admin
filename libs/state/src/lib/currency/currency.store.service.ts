import { Injectable } from '@angular/core';
import { CatalogService } from '@libera/api';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CurrencyQuery } from './currency.query';
import { CurrencyStore } from './currency.store';

@Injectable({
    providedIn: 'root',
})
export class CurrencyStoreService {
    constructor(
        private query: CurrencyQuery,
        private store: CurrencyStore,
        private catalogService: CatalogService
    ) {}

    fetchAll() {
        const shouldFetch = !this.query.getLoaded() || this.query.getError();

        if (!shouldFetch) return EMPTY;

        this.store.fetchAll();

        return this.catalogService
            .getCurrencies()
            .pipe(
                tap(
                    payload => this.store.fetchAllSuccess(payload),
                    error => this.store.fetchAllError(error)
                )
            );
    }
}
