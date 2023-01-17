import { Injectable } from '@angular/core';
import { LenderInvoiceDetail } from '@libera/models/lender';
import { EntityQuery, UIState } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

import { LenderInvoiceRequestDetailStore, LenderInvoiceRequestDetailUI } from './lender-invoice-request-detail.store';

@Injectable({
    providedIn: 'root',
})
export class LenderInvoiceRequestDetailQuery extends EntityQuery<
    LenderInvoiceDetail,
    LenderInvoiceRequestDetailUI
> {
    constructor(private store: LenderInvoiceRequestDetailStore) {
        super(store);
    }

    selectChangingStatus(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.changeStatus.submitting : false))
        );
    }

    getRequestId(id: number): number{
        let lender = this.getEntity(id);
        return lender ? lender.requestId : null;
    }
}
