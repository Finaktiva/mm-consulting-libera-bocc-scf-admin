import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { BulkInvoiceNegotiationListPaginationFilterPayload } from '@libera/models/bulk-invoice-negotiation';
import { tap } from 'rxjs/operators';

import { PayerBulkInvoiceNegotiationQuery } from '../../state/payer-bulk-invoice-negotiation.query';
import { PayerBulkInvoiceNegotiationStoreService } from '../../state/payer-bulk-invoice-negotiation.store.service';

@Component({
    selector: 'payer-bulk-invoice-negotiation-list',
    templateUrl: './payer-bulk-invoice-negotiation-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerBulkInvoiceNegotiationListPage implements OnInit {
    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    total$ = this.query.selectTotal();

    filters$ = this.query.selectFilters();

    pageIndex$ = this.query.selectPageIndex();

    pageSize$ = this.query.selectPageSize();

    entities$ = this.query.selectEntitiesWithUI();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private query: PayerBulkInvoiceNegotiationQuery,
        private storeService: PayerBulkInvoiceNegotiationStoreService
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
