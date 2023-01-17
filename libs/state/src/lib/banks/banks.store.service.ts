import { Injectable } from '@angular/core';
import { CatalogService } from '@libera/api';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BankQuery } from './banks.query';
import { BankStore } from './banks.store';

@Injectable({
    providedIn: 'root',
})
export class BankStoreService {
    constructor(
        private query: BankQuery,
        private store: BankStore,
        private catalogService: CatalogService
    ) {}

    fetchAll() {
        this.store.fetchAll();
        return this.catalogService
            .getBanks()
            .pipe(
                tap(
                    payload => this.store.fetchAllSuccess(payload),
                    error => this.store.fetchAllError(error)
                )
            );
    }
}