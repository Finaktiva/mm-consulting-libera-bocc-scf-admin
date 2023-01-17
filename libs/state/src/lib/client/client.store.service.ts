import { Injectable } from '@angular/core';
import { ClientService } from '@libera/api';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ClientQuery } from './client.query';
import { ClientStore } from './client.store';

@Injectable({
    providedIn: 'root',
})
export class ClientStoreService {
    constructor(
        private query: ClientQuery,
        private store: ClientStore,
        private clientService: ClientService
    ) {}

    fetchByCriterion(document_type: string, document_number: string) {
        const shouldFetch = !this.query.getLoaded() || this.query.getError();

        if (!shouldFetch) return EMPTY;

        this.store.fetch(document_number);

        return this.clientService
            .findByCriterion(document_type, document_number)
            .pipe(
                tap(
                    client => this.store.fetchSuccess(document_number, client),
                    error => this.store.fetchError(document_number,error)
                )
            );
    }
}
