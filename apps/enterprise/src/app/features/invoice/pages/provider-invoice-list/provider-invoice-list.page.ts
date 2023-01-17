import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { ProviderInvoicePaginationFiltersPayload } from '@libera/models/provider';

import { ProviderInvoiceQuery } from '../../state/provider-invoice.query';
import { ProviderInvoiceStoreService } from '../../state/provider-invoice.store.service';

@Component({
    selector: 'provider-invoice-list',
    templateUrl: './provider-invoice-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderInvoiceListPage {
    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    total$ = this.query.selectTotal();

    filters$ = this.query.selectFilters();

    pageIndex$ = this.query.selectPageIndex();

    pageSize$ = this.query.selectPageSize();

    entities$ = this.query.selectEntitiesWithUI();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private query: ProviderInvoiceQuery,
        private storeService: ProviderInvoiceStoreService
    ) {}

    ngOnInit() {
        this.fetchCurrentPage();
    }

    onChangeFilters(payload: ProviderInvoicePaginationFiltersPayload) {
        this.storeService.changeFilters(payload).subscribe();
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
