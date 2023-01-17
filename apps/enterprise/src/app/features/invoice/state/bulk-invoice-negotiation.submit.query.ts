import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';

import { BulkInvoiceNegotiationSubmitStore } from './bulk-invoice-negotiation.submit.store';

@Injectable({
    providedIn: 'root',
})
export class BulkInvoiceNegotiationSubmitQuery extends SubmitQuery {
    constructor(private store: BulkInvoiceNegotiationSubmitStore) {
        super(store);
    }
}
