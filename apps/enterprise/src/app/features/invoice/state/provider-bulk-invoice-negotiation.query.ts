import { Injectable } from '@angular/core';
import {
    BulkInvoiceNegotiationListPaginationFilterPayload,
    ProviderBulkInvoiceNegotiation,
} from '@libera/models/bulk-invoice-negotiation';
import { EntityListQuery, StateWithUI, UIState } from '@mediomelon/ng-core';

import { ProviderBulkInvoiceNegotiationStore } from './provider-bulk-invoice-negotiation.store';

export interface ProviderBulkInvoiceNegotiationWithUI
    extends StateWithUI<ProviderBulkInvoiceNegotiation, UIState> {}

@Injectable({
    providedIn: 'root',
})
export class ProviderBulkInvoiceNegotiationQuery extends EntityListQuery<
    ProviderBulkInvoiceNegotiation,
    UIState,
    BulkInvoiceNegotiationListPaginationFilterPayload
> {
    constructor(private store: ProviderBulkInvoiceNegotiationStore) {
        super(store);
    }
}
