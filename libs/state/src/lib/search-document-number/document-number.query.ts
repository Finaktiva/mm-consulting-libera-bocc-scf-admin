import { Injectable } from '@angular/core';
import { DocumentNumber } from '@libera/models/enterprise';
import { EntityListQuery } from '@mediomelon/ng-core';

import { DocumentNumberStore } from './document-number.store';

@Injectable({
    providedIn: 'root',
})
export class DocumentNumberQuery extends EntityListQuery<DocumentNumber> {
    constructor(store: DocumentNumberStore) {
        super(store);
    }
}