import { Injectable } from '@angular/core';
import { ProviderInvoice, ProviderInvoicePaginationFiltersPayload } from '@libera/models/provider';
import { Enterprise, InvoiceStatus } from '@libera/models/shared';
import { EntityListQuery, StateWithUI, UIState } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

import { ProviderInvoiceStore } from './provider-invoice.store';

export interface ProviderInvoiceWithUI
    extends StateWithUI<ProviderInvoice, UIState> {}

@Injectable({
    providedIn: 'root',
})
export class ProviderInvoiceQuery extends EntityListQuery<
    ProviderInvoice,
    UIState,
    ProviderInvoicePaginationFiltersPayload
> {
    constructor(private store: ProviderInvoiceStore) {
        super(store);
    }

    selectEntityHasPayer(id: number): Observable<boolean> {
        return this.selectEntityPayer(id).pipe(select(entity => !!entity));
    }

    selectEntityPayer(id: number): Observable<Enterprise> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.payer : null))
        );
    }

    selectEntityCurrencyCode(id: number): Observable<string> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.currencyCode : null))
        );
    }

    selectEntityStatus(id: number): Observable<InvoiceStatus> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.status : null))
        );
    }

    selectInvoiceBulkId(id:number):Observable<number>{
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.bulkNegotiationId : null))
        )
    }
}
