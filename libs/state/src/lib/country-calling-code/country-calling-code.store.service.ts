import { Injectable } from '@angular/core';
import { CatalogService } from '@libera/api';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CountryCallingCodeQuery } from './country-calling-code.query';
import { CountryCallingCodeStore } from './country-calling-code.store';

@Injectable({
    providedIn: 'root',
})
export class CountryCallingCodeStoreService {
    constructor(
        private query: CountryCallingCodeQuery,
        private store: CountryCallingCodeStore,
        private catalogService: CatalogService
    ) {}

    fetchAll() {
        const shouldFetch = !this.query.getLoaded() || this.query.getError();

        if (!shouldFetch) return EMPTY;

        this.store.fetchAll();

        return this.catalogService
            .getCountryCallingCodes()
            .pipe(
                tap(
                    payload => this.store.fetchAllSuccess(payload),
                    error => this.store.fetchAllError(error)
                )
            );
    }
}
