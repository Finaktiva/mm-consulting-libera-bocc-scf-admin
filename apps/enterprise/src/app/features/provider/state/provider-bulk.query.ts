import { Injectable } from '@angular/core';
import { EnterpriseProviderBulk } from '@libera/models/enterprise';
import { EntityListQuery } from '@mediomelon/ng-core';

import { ProviderBulkStore } from './provider-bulk.store';

@Injectable({
    providedIn: 'root',
})
export class ProviderBulkQuery extends EntityListQuery<EnterpriseProviderBulk> {
    constructor(private store: ProviderBulkStore) {
        super(store);
    }
}
