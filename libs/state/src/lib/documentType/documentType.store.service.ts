import { Injectable } from '@angular/core';
import { CatalogService } from '@libera/api';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DocumentTypeQuery } from './documentType.query';
import { DocumentTypeStore } from './documentType.store';

@Injectable({
    providedIn: 'root',
})
export class DocumentTypeStoreService {
    constructor(
        private query: DocumentTypeQuery,
        private store: DocumentTypeStore,
        private catalogService: CatalogService
    ) {}

    fetchAll(isDefault) {
        this.store.fetchAll();
        return this.catalogService
            .getDocumentTypes(isDefault)
            .pipe(
                tap(
                    payload => this.store.fetchAllSuccess(payload),
                    error => this.store.fetchAllError(error)
                )
            );
    }
}