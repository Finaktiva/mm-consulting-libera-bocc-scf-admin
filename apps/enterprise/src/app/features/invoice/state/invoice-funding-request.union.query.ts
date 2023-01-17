import { Injectable } from '@angular/core';
import { LenderFundingRequest } from '@libera/models/lender';
import { UnionQuery } from '@mediomelon/ng-core';
import { combineLatest, Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { FundingRequestQuery } from './funding-request.query';
import { InvoiceFundingRequestUnionStore } from './invoice-funding-request.union.store';

@Injectable({
    providedIn: 'root',
})
export class InvoiceFundingRequestUnionQuery extends UnionQuery {
    constructor(
        private store: InvoiceFundingRequestUnionStore,
        private fundingRequestQuery: FundingRequestQuery
    ) {
        super(store);
    }

    selectEntityFundingRequest(id: number): Observable<LenderFundingRequest[]> {
        return combineLatest(
            this.selectEntityIds(id),
            this.fundingRequestQuery.selectEntitiesMap()
        ).pipe(
            select(([ids, entitiesMap]) =>
                ids && entitiesMap ? ids.map(id => entitiesMap[id]) : []
            )
        );
    }

    selectEntityLatestFundingRequest(
        id: number
    ): Observable<LenderFundingRequest> {
        return this.selectEntityFundingRequest(id).pipe(
            select(fundingRequests =>
                fundingRequests && fundingRequests.length
                    ? fundingRequests[0]
                    : null
            )
        );
    }
}
