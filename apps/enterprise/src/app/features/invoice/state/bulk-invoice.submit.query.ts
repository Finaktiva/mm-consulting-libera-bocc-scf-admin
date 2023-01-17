import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';

import { BulkInvoiceSubmitStore } from './bulk-invoice.submit.store';

@Injectable({
    providedIn: 'root',
})
export class BulkInvoiceSubmitQuery extends SubmitQuery {
    constructor(private store: BulkInvoiceSubmitStore) {
        super(store);
    }
}
