import { Injectable } from '@angular/core';
import { InvoiceNegotiation, NegotiationStatus } from '@libera/models/shared';
import { EntityQuery } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

import { InvoiceNegotiationUI, NegotiationStore } from './negotiation.store';

@Injectable({
    providedIn: 'root',
})
export class NegotiationQuery extends EntityQuery<
    InvoiceNegotiation,
    InvoiceNegotiationUI
> {
    constructor(private store: NegotiationStore) {
        super(store);
    }

    selectEntitiesMap() {
        return super.selectEntitiesMap();
    }

    selectEntityStatus(id: number): Observable<NegotiationStatus> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.status : null))
        );
    }

    selectUIEntityEditingOffer(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.editingOffer : false))
        );
    }

    selectUIEntitySubmittingOffer(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.offer.submitting : false))
        );
    }

    selectUIEntityRejectingOffer(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.reject.submitting : false))
        );
    }

    selectUIEntityAcceptingOffer(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.accept.submitting : false))
        );
    }

    selectUIEntityCancellingOffer(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.cancel.submitting : false))
        );
    }
}
