import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { PayerInvoicePaginationFiltersPayload } from '@libera/models/payer';
import { not } from '@libera/shared';
import { Observable } from 'rxjs';
import { combineLatest, map, tap } from 'rxjs/operators';

import { invoiceConfirmDeleteDialog } from '../../dialogs/invoice-confirm-delete/invoice-confirm-delete.dialog';
import {
    PayerInvoiceBulkNegotiationDialog,
} from '../../dialogs/payer-invoice-bulk-negotiation/payer-invoice-bulk-negotiation.dialog';
import { PayerInvoiceQuery } from '../../state/payer-invoice.query';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';

@Component({
    selector: 'invoice-list',
    templateUrl: './invoice-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListPage {
    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    total$ = this.query.selectTotal();

    filters$ = this.query.selectFilters();

    pageIndex$ = this.query.selectPageIndex();

    pageSize$ = this.query.selectPageSize();

    entities$ = this.query.selectEntitiesWithUI();

    hasSelection$ = this.query.hasCurrentPageSelection();

    allSelected$ = this.query.allSelected();

    currencies$ = this.query.selectCurrentCurrencies();

    isFilteringByProvider$: Observable<boolean>;

    shouldRenderFilterByProviderWarning$: Observable<boolean>;

    shouldRenderMultipleCurrenciesWarning$: Observable<boolean>;

    shouldRenderCheckbox$: Observable<boolean>;

    shouldDisableNegotiationButton$: Observable<boolean>;

    hasDifferentSelection$: Observable<boolean>;

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private dialog: MatDialog,
        private query: PayerInvoiceQuery,
        private storeService: PayerInvoiceStoreService
    ) {
        const isFilteringByProvider$ = this.filters$.pipe(
            map(filters => filters.filter_by == 'provider')
        );

        this.isFilteringByProvider$ = isFilteringByProvider$;

        this.shouldRenderFilterByProviderWarning$ = isFilteringByProvider$.pipe(
            map(value => !value)
        );

        const hasMultipleCurrencies$ = this.query
            .selectCurrentCurrencies()
            .pipe(map(currencies => currencies.length > 1));

        this.shouldRenderMultipleCurrenciesWarning$ = hasMultipleCurrencies$;

        this.shouldRenderCheckbox$ = isFilteringByProvider$.pipe(
            combineLatest(this.isLoading$),
            map(([isFiltering, isLoading]) => !isLoading && isFiltering)
        );

        const hasUniqueSelection$ = this.query.hasUniqueSelection();

        this.hasDifferentSelection$ = hasUniqueSelection$.pipe(
            combineLatest(this.hasSelection$),
            map(([unique, selection]) => selection && !unique)
        );

        this.shouldDisableNegotiationButton$ = hasUniqueSelection$.pipe(
            combineLatest(
                this.query.hasSelection(),
                isFilteringByProvider$,
                hasMultipleCurrencies$
            ),
            map(
                ([
                    unique,
                    hasSelection,
                    isFilteringByProvider,
                    hasMultipleCurrencies,
                ]) =>
                    !unique ||
                    !hasSelection ||
                    !isFilteringByProvider ||
                    hasMultipleCurrencies
            )
        );
    }

    ngOnInit() {
        this.fetchCurrentPage();
    }

    onOpenBulkNegotiationDialog() {
        const selectedInvoices = this.query.getSelectedInvoices();
        this.dialog.open(PayerInvoiceBulkNegotiationDialog, {
            data: selectedInvoices,
        });
    }

    onDelete(id: number) {
        this.dialog.open(invoiceConfirmDeleteDialog, { data: { id } });
    }

    onSelection(id: number) {
        this.storeService.select(id);
    }

    onSelectAll(selected: boolean) {
        this.storeService.selectAll(selected);
    }

    onChangeFilters(payload: PayerInvoicePaginationFiltersPayload) {
        this.storeService.changeFilters(payload).subscribe();
        this.storeService.clearSelection();
    }

    onChangePage(payload: PageEvent) {
        this.storeService
            .changePage({
                index: payload.pageIndex,
                size: payload.pageSize,
            })
            .subscribe();
    }

    fetchCurrentPage() {
        this.storeService.fetchCurrentPage().subscribe();
    }
}
