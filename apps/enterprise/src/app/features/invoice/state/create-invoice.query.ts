import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';

import { CreateInvoiceStore } from './create-invoice.store';

@Injectable({
    providedIn: 'root',
})
export class CreateInvoiceQuery extends SubmitQuery {
    constructor(private store: CreateInvoiceStore) {
        super(store);
    }
}
