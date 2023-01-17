import { Injectable } from '@angular/core';
import { EnterpriseModuleRequest } from '@libera/models/enterprise-request';
import { EntityListQuery, StateWithUI } from '@mediomelon/ng-core';

import { EnterpriseRequestUI } from './models';
import { EnterpriseRequestModuleStore } from './request-module.store';

export interface EnterpriseRequestModuleWithUI
    extends StateWithUI<EnterpriseModuleRequest, EnterpriseRequestUI> {}

@Injectable({
    providedIn: 'root',
})
export class EnterpriseRequestModuleQuery extends EntityListQuery<
    EnterpriseModuleRequest,
    EnterpriseRequestUI
> {
    constructor(private store: EnterpriseRequestModuleStore) {
        super(store);
    }
}
