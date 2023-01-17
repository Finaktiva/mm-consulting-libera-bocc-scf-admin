import { Injectable } from '@angular/core';
import { LenderQuotaRequestListPaginationFilterPayload } from '@libera/models/lender-quota-request';
import { EntityListQuery, StateWithUI, UIState } from '@mediomelon/ng-core';

import {
    LenderQuotaRequestStore,
    LenderQuotaRequestUI,
} from './lender-quota-request.store';
import { LenderQuotaRequest } from '@libera/models/lender-quota-request';

import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

export interface LenderQuotaRequestWithUI
    extends StateWithUI<LenderQuotaRequest, LenderQuotaRequestUI> {}

@Injectable({
    providedIn: 'root',
})
export class LenderQuotaRequestQuery extends EntityListQuery<
    LenderQuotaRequest,
    LenderQuotaRequestUI
> {
    constructor(private store: LenderQuotaRequestStore) {
        super(store);
    }

    selectQuotaSubmitting(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.quotaRequest.submitting : false))
        );
    }

    selectUIEntityApproving(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.approve.submitting : false))
        );
    }

    selectUIEntityRejecting(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.reject.submitting : false))
        );
    }

    selectUIEntityUpdating(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.update.submitting : false))
        );
    }
}
