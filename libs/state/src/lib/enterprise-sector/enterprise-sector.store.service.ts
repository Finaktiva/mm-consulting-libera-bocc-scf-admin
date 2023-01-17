import { Injectable } from '@angular/core';
import { CatalogService } from '@libera/api';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EnterpriseSectorQuery } from './enterprise-sector.query';
import { EnterpriseSectorStore } from './enterprise-sector.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseSectorStoreService {
    constructor(
        private query: EnterpriseSectorQuery,
        private store: EnterpriseSectorStore,
        private catalogService: CatalogService
    ) {}

    fetchAll() {
        const shouldFetch = !this.query.getLoaded() || this.query.getError();

        if (!shouldFetch) return EMPTY;

        this.store.fetchAll();

        return this.catalogService
            .getEnterpriseSectors()
            .pipe(
                tap(
                    payload => this.store.fetchAllSuccess(payload),
                    error => this.store.fetchAllError(error)
                )
            );
    }
}
