import { Injectable } from '@angular/core';
import {
    EnterpriseDetail,
    EnterpriseLinkRequest,
    EnterpriseRequestPaginationFilters,
    EnterpriseRequestStatus,
} from '@libera/models/enterprise-request';
import { EntityListQuery, StateWithUI } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

import { EnterpriseLinkRequestUI, EnterpriseRequestLinkStore } from './request-link.store';

export interface EnterpriseRequestLinkWithUI
    extends StateWithUI<EnterpriseLinkRequest, EnterpriseLinkRequestUI> {}

@Injectable({
    providedIn: 'root',
})
export class EnterpriseRequestLinkQuery extends EntityListQuery<
    EnterpriseLinkRequest,
    EnterpriseLinkRequestUI,
    EnterpriseRequestPaginationFilters
> {
    constructor(private store: EnterpriseRequestLinkStore) {
        super(store);
    }

    selectUIEntityUpdating(id: number) {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.update.submitting : false))
        );
    }

    selectEntityStatus(id: number): Observable<EnterpriseRequestStatus> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.status : null))
        );
    }

    selectEntityStatusIsPending(id: number): Observable<boolean> {
        return this.selectEntityStatus(id).pipe(
            select(status => status === 'EVALUATION_PENDING')
        );
    }

    selectEntityEnterpriseRequested(id: number): Observable<EnterpriseDetail> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.enterpriseRequested : null))
        );
    }

    selectEntityEnterpriseRequestedStatusIsPendingAccountCreation(
        id: number
    ): Observable<boolean> {
        return this.selectEntityEnterpriseRequested(id).pipe(
            select(enterprise =>
                enterprise
                    ? enterprise.status == 'PENDING_ACCOUNT_CREATION'
                    : false
            )
        );
    }

    selectUIEntityInviting(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.invite.submitting : false))
        );
    }
}
