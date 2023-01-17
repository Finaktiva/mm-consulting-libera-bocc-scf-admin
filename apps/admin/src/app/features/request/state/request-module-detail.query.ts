import { Injectable } from '@angular/core';
import { EnterpriseModuleRequestDetail } from '@libera/models/enterprise-request';
import { EntityQuery } from '@mediomelon/ng-core';
import { select } from 'rxjs-augmented/operators';

import { EnterpriseRequestUI } from './models';
import { EnterpriseRequestModuleDetailStore } from './request-module-detail.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseRequestModuleDetailQuery extends EntityQuery<
    EnterpriseModuleRequestDetail,
    EnterpriseRequestUI
> {
    constructor(private store: EnterpriseRequestModuleDetailStore) {
        super(store);
    }

    selectEntityIsPending(id: number) {
        return this.selectEntity(id).pipe(
            select(state =>
                state ? state.status == 'EVALUATION_PENDING' : false
            )
        );
    }

    selectEntityUpdating(id: number) {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.update.submitting : false))
        );
    }
}
