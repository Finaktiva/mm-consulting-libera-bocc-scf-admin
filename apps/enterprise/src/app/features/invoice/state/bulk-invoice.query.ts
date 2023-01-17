import { Injectable } from '@angular/core';
import { BulkInvoice } from '@libera/models/bulk-invoice';
import { EntityListQuery, StateWithUI, UIState } from '@mediomelon/ng-core';

import { BulkInvoiceStore } from './bulk-invoice.store';

export interface BulkInvoiceWithUI extends StateWithUI<BulkInvoice, UIState> {}

@Injectable({
    providedIn: 'root',
})
export class BulkInvoiceQuery extends EntityListQuery<BulkInvoice, UIState> {
    constructor(private store: BulkInvoiceStore) {
        super(store);
    }
}
