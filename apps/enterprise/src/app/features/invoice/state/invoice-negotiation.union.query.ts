import { Injectable } from '@angular/core';
import { InvoiceNegotiation, NegotiationStatus } from '@libera/models/shared';
import { UnionQuery } from '@mediomelon/ng-core';
import { combineLatest, Observable, of } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { switchMap, tap } from 'rxjs/operators';

import { InvoiceNegotiationUnionStore } from './invoice-negotiation.union.store';
import { NegotiationQuery } from './negotiation.query';

@Injectable({
    providedIn: 'root',
})
export class InvoiceNegotiationUnionQuery extends UnionQuery {
    constructor(
        private store: InvoiceNegotiationUnionStore,
        private negotiationQuery: NegotiationQuery
    ) {
        super(store);
    }

    selectEntityNegotiations(id: number): Observable<InvoiceNegotiation[]> {
        return combineLatest(
            this.selectEntityIds(id),
            this.negotiationQuery.selectEntitiesMap()
        ).pipe(
            select(([ids, entitiesMap]) =>
                ids && entitiesMap ? ids.map(id => entitiesMap[id]) : []
            )
        );
    }

    selectEntityLatestNegotiation(id: number): Observable<InvoiceNegotiation> {
        return this.selectEntityNegotiations(id).pipe(
            select(negotiations =>
                negotiations && negotiations.length ? negotiations[0] : null
            )
        );
    }

    selectEntityLatestNegotiationEditingOffer(id: number): Observable<boolean> {
        return this.selectEntityLatestNegotiation(id).pipe(
            switchMap(negotiation =>
                negotiation
                    ? this.negotiationQuery.selectUIEntityEditingOffer(
                          negotiation.id
                      )
                    : of(false)
            )
        );
    }

    selectEntityLatestNegotiationStatus(
        id: number
    ): Observable<NegotiationStatus> {
        return this.selectEntityLatestNegotiation(id).pipe(
            switchMap(negotiation =>
                negotiation
                    ? this.negotiationQuery.selectEntityStatus(negotiation.id)
                    : of(null)
            )
        );
    }

    selectEntityLatestNegotiationSubmittingOffer(
        id: number
    ): Observable<boolean> {
        return this.selectEntityLatestNegotiation(id).pipe(
            switchMap(negotiation =>
                negotiation
                    ? this.negotiationQuery.selectUIEntitySubmittingOffer(
                          negotiation.id
                      )
                    : of(false)
            )
        );
    }

    selectEntityLatestNegotiationRejectingOffer(
        id: number
    ): Observable<boolean> {
        return this.selectEntityLatestNegotiation(id).pipe(
            switchMap(negotiation =>
                negotiation
                    ? this.negotiationQuery.selectUIEntityRejectingOffer(
                          negotiation.id
                      )
                    : of(false)
            )
        );
    }

    selectEntityLatestNegotiationAcceptingOffer(
        id: number
    ): Observable<boolean> {
        return this.selectEntityLatestNegotiation(id).pipe(
            switchMap(negotiation =>
                negotiation
                    ? this.negotiationQuery.selectUIEntityAcceptingOffer(
                          negotiation.id
                      )
                    : of(false)
            )
        );
    }

    selectEntityLatestNegotiationCancellingOffer(
        id: number
    ): Observable<boolean> {
        return this.selectEntityLatestNegotiation(id).pipe(
            switchMap(negotiation =>
                negotiation
                    ? this.negotiationQuery.selectUIEntityCancellingOffer(
                          negotiation.id
                      )
                    : of(false)
            )
        );
    }

    getEntityLatestNegotiationId(id: number): number {
        const { entities } = this.getState();
        const { ids } = entities[id];
        return ids && ids.length ? (ids[0] as number) : null;
    }
}
