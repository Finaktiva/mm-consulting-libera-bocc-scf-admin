import { Injectable } from '@angular/core';
import {
    BulkInvoiceNegotiationListPaginationFilterPayload,
    PayerBulkInvoiceNegotiation,
} from '@libera/models/bulk-invoice-negotiation';
import { EntityListQuery, StateWithUI, UIState } from '@mediomelon/ng-core';

import { PayerBulkInvoiceNegotiationStore } from './payer-bulk-invoice-negotiation.store';

export interface PayerBulkInvoiceNegotiationWithUI
    extends StateWithUI<PayerBulkInvoiceNegotiation, UIState> {}

@Injectable({
    providedIn: 'root',
})
export class PayerBulkInvoiceNegotiationQuery extends EntityListQuery<
    PayerBulkInvoiceNegotiation,
    UIState,
    BulkInvoiceNegotiationListPaginationFilterPayload
> {
    constructor(private store: PayerBulkInvoiceNegotiationStore) {
        super(store);
    }
}
