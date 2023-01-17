import { Injectable } from '@angular/core';
import { LenderService } from '@libera/api';
import { LenderListPaginationFilterPayload } from '@libera/models/lender';
import { Page } from '@mediomelon/ng-core';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LenderQuery } from './lender.query';
import { LenderStore } from './lender.store';

@Injectable({
    providedIn: 'root',
})
export class LenderStoreService {
    constructor(
        private query: LenderQuery,
        private store: LenderStore,
        private lenderService: LenderService
    ) {}

    fetchCurrentPage() {
        // const shouldFetch = this.query.shouldFetch();

        // if (!shouldFetch) return EMPTY;

        const page = this.query.getPage();
        const filters = this.query.getFilters();

        this.store.fetchPage();
        return this.fetchPage(page, filters);
    }

    changePage(page: Page) {
        const filters = this.query.getFilters();

        this.store.fetchPage(page);

        return this.fetchPage(page, filters);
    }

    changeFilters(filters: LenderListPaginationFilterPayload) {
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(page, filters);
    }

    private fetchPage(page: Page, filters: LenderListPaginationFilterPayload) {
        return this.lenderService
            .getPage(page, filters)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }
}
