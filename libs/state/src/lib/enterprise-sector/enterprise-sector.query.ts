import { Injectable } from '@angular/core';
import { EnterpriseSector } from '@libera/models/catalog';
import { EntityQuery } from '@mediomelon/ng-core';

import { EnterpriseSectorStore } from './enterprise-sector.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseSectorQuery extends EntityQuery<EnterpriseSector> {
    constructor(store: EnterpriseSectorStore) {
        super(store);
    }
}
