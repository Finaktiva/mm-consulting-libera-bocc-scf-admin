import { Injectable } from '@angular/core';
import { DocumentType } from '@libera/models/catalog';
import { EntityQuery } from '@mediomelon/ng-core';
import { DocumentTypeStore } from './documentType.store';

@Injectable({
    providedIn: 'root',
})
export class DocumentTypeQuery extends EntityQuery<DocumentType> {
    constructor(store: DocumentTypeStore) {
        super(store);
    }
}