import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';

import { BulkInvoiceQuery } from '../../state/bulk-invoice.query';
import { BulkInvoiceStoreService } from '../../state/bulk-invoice.store.service';

@Component({
    selector: 'bulk-list',
    templateUrl: './bulk-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkListPage {
    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    total$ = this.query.selectTotal();

    pageIndex$ = this.query.selectPageIndex();

    pageSize$ = this.query.selectPageSize();

    entities$ = this.query.selectEntitiesWithUI();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private query: BulkInvoiceQuery,
        private storeService: BulkInvoiceStoreService
    ) {}

    ngOnInit() {
        this.fetchCurrentPage();
    }

    onRefresh(id: number) {
        this.storeService.fetch(id).subscribe();
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
