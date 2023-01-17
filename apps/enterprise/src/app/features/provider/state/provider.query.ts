import { Injectable } from '@angular/core';
import { EnterpriseProvider } from '@libera/models/enterprise';
import { EntityListQuery } from '@mediomelon/ng-core';

import { EnterpriseProviderUI, ProviderStore } from './provider.store';

@Injectable({
    providedIn: 'root',
})
export class ProviderQuery extends EntityListQuery<
    EnterpriseProvider,
    EnterpriseProviderUI
> {
    constructor(private store: ProviderStore) {
        super(store);
    }
}
