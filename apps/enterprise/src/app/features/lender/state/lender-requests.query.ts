import { Injectable } from '@angular/core';
import { EntityListQuery, ID } from '@mediomelon/ng-core';
import {
    LenderQuotaRequest,
    LenderQuotaRequestListPaginationFilterPayload,
} from '@libera/models/lender-quota-request';
import {
    LenderQuotaRequestUIState,
    LenderRequestsStore,
} from './lender-requests.store';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LenderRequestsQuery extends EntityListQuery<
    LenderQuotaRequest,
    LenderQuotaRequestUIState,
    LenderQuotaRequestListPaginationFilterPayload
> {
    constructor(private store: LenderRequestsStore) {
        super(store);
    }

    selectUIEntityUpdating(id: ID) {
        return this.selectUIEntity(id).pipe(
            map(entity => (entity ? entity.updating.submitting : false))
        );
    }
}
