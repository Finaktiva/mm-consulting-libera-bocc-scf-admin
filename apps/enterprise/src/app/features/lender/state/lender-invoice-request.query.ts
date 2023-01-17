import { Injectable } from '@angular/core';
import {
    LenderInvoice,
    LenderInvoiceRequestPaginationFiltersPayload,
} from '@libera/models/lender';
import { EntityListQuery, StateWithUI, UIState } from '@mediomelon/ng-core';

import { LenderInvoiceRequestStore } from './lender-invoice-request.store';

export interface LenderInvoiceRequestWithUI
    extends StateWithUI<LenderInvoice, UIState> {}

@Injectable({
    providedIn: 'root',
})
export class LenderInvoiceRequestQuery extends EntityListQuery<
    LenderInvoice,
    UIState,
    LenderInvoiceRequestPaginationFiltersPayload
> {
    constructor(private store: LenderInvoiceRequestStore) {
        super(store);
    }
}
