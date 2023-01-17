import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface SharedBulkInvoiceNegotiationQuery {
    selectUIEntityAcceptingOffer(id: number): Observable<boolean>;

    selectUIEntityRejectingOffer(id: number): Observable<boolean>;

    selectUIEntityMakingCounterOffer(id: number): Observable<boolean>;
}

export const SHARED_BULK_INVOICE_NEGOTIATION_QUERY = new InjectionToken<
    SharedBulkInvoiceNegotiationQuery
>('shared.bulk.invoice.negotiation.query');
