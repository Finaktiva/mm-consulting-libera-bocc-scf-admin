import { Injectable } from '@angular/core';
import { EnterpriseCustomAttribute } from '@libera/models/enterprise';
import { PayerInvoice, PayerInvoicePaginationFiltersPayload } from '@libera/models/payer';
import { Enterprise, InvoiceStatus } from '@libera/models/shared';
import { unique } from '@libera/shared';
import { EntityListSelectionQuery } from '@libera/state';
import { StateWithUI } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { combineLatest, map, tap } from 'rxjs/operators';

import { SELECTABLE_STATUSES } from '../constants';
import { PayerInvoiceStore, PayerInvoiceUI } from './payer-invoice.store';

export interface PayerInvoiceWithUI
    extends StateWithUI<PayerInvoice, PayerInvoiceUI> {}

@Injectable({
    providedIn: 'root',
})
export class PayerInvoiceQuery extends EntityListSelectionQuery<
    PayerInvoice,
    PayerInvoiceUI,
    PayerInvoicePaginationFiltersPayload
> {
    constructor(store: PayerInvoiceStore) {
        super(store);
    }

    selectUIEntityNegotiating(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.negotiate.submitting : false))
        );
    }

    selectUIEntityUpdatingProvider(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity =>
                entity ? entity.updateProvider.submitting : false
            )
        );
    }

    selectUIEntityEditingProvider(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.editingProvider : false))
        );
    }

    selectEntityHasCustomAttributes(id: number): Observable<boolean> {
        return this.selectEntityCustomAttributes(id).pipe(
            select(entity => entity && entity.length > 0)
        );
    }

    selectEntityStatus(id: number): Observable<InvoiceStatus> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.status : null))
        );
    }

    selectEntityHasProvider(id: number): Observable<boolean> {
        return this.selectEntityProvider(id).pipe(select(entity => !!entity));
    }

    selectEntityProvider(id: number): Observable<Enterprise> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.provider : null))
        );
    }

    selectEntityCurrencyCode(id: number): Observable<string> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.currencyCode : null))
        );
    }

    selectEntityHasBulkNegotiationId(id: number): Observable<number> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.bulkNegotiationId : null))
        );
    }

    selectEntityCustomAttributes(
        id: number
    ): Observable<EnterpriseCustomAttribute[]> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.customAttributes : []))
        );
    }

    selectUIEntityDeleting(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.delete.submitting : false))
        );
    }

    selectUIEntityUpdatingLender(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.updateLender.submitting : false))
        );
    }

    selectUIEntityEditingLender(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.editingLender : false))
        );
    }

    selectEntityHasLender(id: number): Observable<boolean> {
        return this.selectEntityLender(id).pipe(select(entity => !!entity));
    }

    selectEntityLender(id: number): Observable<Enterprise> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.lender : null))
        );
    }

    selectCurrentCurrencies(): Observable<string[]> {
        return this.selectCurrentSelection().pipe(
            select(invoices =>
                Array.from(
                    new Set(invoices.map(invoice => invoice.currencyCode))
                )
            )
        );
    }

    hasUniqueSelection(): Observable<boolean> {
        return this.selectCurrentSelection().pipe(
            select(selection =>
                selection.length
                    ? selection
                          .map(invoice => invoice.provider.nit)
                          .filter(unique)
                    : []
            ),
            map(nits => nits.length == 1)
        );
    }

    allSelected() {
        return this.currentIdsIntersection().pipe(
            combineLatest(this.currentSelectableEntities()),
            map(
                ([selected, selectable]) => selected.length == selectable.length
            )
        );
    }

    getSelectedInvoices(): PayerInvoice[] {
        const state = this.getState();
        return state.ids
            .filter(id => this.getUIEntity(id).selected)
            .map(id => this.getEntity(id));
    }

    private currentSelectableEntities() {
        return this.selectEntitiesMap().pipe(
            combineLatest(this.selectIds()),
            select(([entities, ids]) =>
                ids.filter(id =>
                    SELECTABLE_STATUSES.includes(entities[id].status)
                )
            )
        );
    }
}
