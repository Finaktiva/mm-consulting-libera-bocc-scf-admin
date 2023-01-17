import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';

import { ProviderBulkCreateStore } from './provider-bulk-create.store';

@Injectable({
    providedIn: 'root',
})
export class ProviderBulkCreateQuery extends SubmitQuery {
    constructor(private store: ProviderBulkCreateStore) {
        super(store);
    }
}
