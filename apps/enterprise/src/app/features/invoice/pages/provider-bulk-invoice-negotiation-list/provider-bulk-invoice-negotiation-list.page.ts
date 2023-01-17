import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { BulkInvoiceNegotiationListPaginationFilterPayload } from '@libera/models/bulk-invoice-negotiation';
import { tap } from 'rxjs/operators';

import { ProviderBulkInvoiceNegotiationQuery } from '../../state/provider-bulk-invoice-negotiation.query';
import { ProviderBulkInvoiceNegotiationStoreService } from '../../state/provider-bulk-invoice-negotiation.store.service';

@Component({
    selector: 'provider-bulk-invoice-negotiation-list',
    templateUrl: './provider-bulk-invoice-negotiation-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderBulkInvoiceNegotiationListPage implements OnInit {
    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    total$ = this.query.selectTotal();

    filters$ = this.query.selectFilters();

    pageIndex$ = this.query.selectPageIndex();

    pageSize$ = this.query.selectPageSize();

    entities$ = this.query.selectEntitiesWithUI();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private query: ProviderBulkInvoiceNegotiationQuery,
        private storeService: ProviderBulkInvoiceNegotiationStoreService
    ) {}

    ngOnInit() {
        this.fetchCurrentPage();
    }

    onChangeFilters(
        payload: BulkInvoiceNegotiationListPaginationFilterPayload
    ) {
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
