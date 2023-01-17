import { Injectable } from '@angular/core';
import { AvailableEnterprise } from '@libera/models/enterprise';
import { EntityQuery } from '@mediomelon/ng-core';

import { AvailableEnterpriseStore } from './available-enterprise.store';

@Injectable()
export class AvailableEnterpriseQuery extends EntityQuery<AvailableEnterprise> {
    constructor(private store: AvailableEnterpriseStore) {
        super(store);
    }
}
