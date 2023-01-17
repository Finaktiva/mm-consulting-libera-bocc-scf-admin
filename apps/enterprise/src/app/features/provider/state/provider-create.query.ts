import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';

import { ProviderCreateStore } from './provider-create.store';

@Injectable({
    providedIn: 'root',
})
export class ProviderCreateQuery extends SubmitQuery {
    constructor(private store: ProviderCreateStore) {
        super(store);
    }
}
