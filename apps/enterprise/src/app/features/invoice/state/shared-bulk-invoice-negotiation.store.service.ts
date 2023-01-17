import { InjectionToken } from '@angular/core';
import { BulkInvoiceNegotiationCounterOfferPayload } from '@libera/models/bulk-invoice-negotiation';
import { Observable } from 'rxjs';

export interface SharedBulkInvoiceNegotiationStoreService {
    acceptOffer(id: number): Observable<void>;
    makeCounterOffer(
        id: number,
        payload: BulkInvoiceNegotiationCounterOfferPayload
    ): Observable<void>;
    rejectOffer(id: number): Observable<void>;
}

export const SHARED_BULK_INVOICE_NEGOTIATION_STORE_SERVICE = new InjectionToken<
    SharedBulkInvoiceNegotiationStoreService
>('shared.bulk.invoice.negotiation.store.service');
