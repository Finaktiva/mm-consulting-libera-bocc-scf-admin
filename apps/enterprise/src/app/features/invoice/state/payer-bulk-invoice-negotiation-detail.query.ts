import { Injectable } from '@angular/core';
import {
    BulkInvoiceNegotiationDetail,
    BulkInvoiceNegotiationOffer,
    BulkInvoiceNegotiationStatus,
    Invoice,
} from '@libera/models/bulk-invoice-negotiation';
import { NegotiationStatus } from '@libera/models/shared';
import { EntityQuery, UIState } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

import {
    PayerBulkInvoiceNegotiationDetailStore,
    PayerBulkInvoiceNegotiationDetailUIState,
} from './payer-bulk-invoice-negotiation-detail.store';
import { SharedBulkInvoiceNegotiationQuery } from './shared-bulk-invoice-negotiation-detail.query';

@Injectable({
    providedIn: 'root',
})
export class PayerBulkInvoiceNegotiationDetailQuery
    extends EntityQuery<
        BulkInvoiceNegotiationDetail,
        PayerBulkInvoiceNegotiationDetailUIState
    >
    implements SharedBulkInvoiceNegotiationQuery {
    constructor(private store: PayerBulkInvoiceNegotiationDetailStore) {
        super(store);
    }

    selectEntityFolio(id: number): Observable<string> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.folio : null))
        );
    }

    selectEntityStatus(id: number): Observable<BulkInvoiceNegotiationStatus> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.status : null))
        );
    }

    selectEntityNegotiationStatus(id: number): Observable<NegotiationStatus> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.negotiation.status : null))
        );
    }

    selectEntityPayerOffer(
        id: number
    ): Observable<BulkInvoiceNegotiationOffer> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.negotiation.payerOffer : null))
        );
    }

    selectEntityHasPayerOffer(id: number): Observable<boolean> {
        return this.selectEntityPayerOffer(id).pipe(select(offer => !!offer));
    }

    selectEntityProviderOffer(
        id: number
    ): Observable<BulkInvoiceNegotiationOffer> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.negotiation.providerOffer : null))
        );
    }

    selectEntityHasProviderOffer(id: number): Observable<boolean> {
        return this.selectEntityProviderOffer(id).pipe(
            select(offer => !!offer)
        );
    }

    selectEntityProvider(id: number): Observable<string> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.provider.enterpriseName : null))
        );
    }

    selectEntityLender(id: number): Observable<string> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.lender.enterpriseName : null))
        );
    }

    selectEntityLenderAvailableQuota(id: number): Observable<number> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.lender.availableQuota : null))
        );
    }

    selectEntityInvoices(id: number): Observable<Invoice[]> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.invoices : []))
        );
    }

    selectEntityInvoiceLength(id: number): Observable<number> {
        return this.selectEntityInvoices(id).pipe(
            select(invoices => invoices.length)
        );
    }

    selectEntityTotalAmount(id: number): Observable<number> {
        return this.selectEntityInvoices(id).pipe(
            select(invoices =>
                invoices.reduce((value, invoice) => value + invoice.amount, 0)
            )
        );
    }

    selectUIEntityAcceptingOffer(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(ui => (ui ? ui.acceptOffer.submitting : false))
        );
    }

    selectUIEntityRejectingOffer(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(ui => (ui ? ui.rejectOffer.submitting : false))
        );
    }

    selectUIEntityMakingCounterOffer(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(ui => (ui ? ui.counterOffer.submitting : false))
        );
    }

    selectUIEntityCancelingOffer(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(ui => (ui ? ui.cancelOffer.submitting : false))
        );
    }
}
