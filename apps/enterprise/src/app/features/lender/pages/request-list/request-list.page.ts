import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { LenderInvoiceRequestPaginationFiltersPayload } from '@libera/models/lender';

import { LenderInvoiceRequestQuery } from '../../state/lender-invoice-request.query';
import { LenderInvoiceRequestStoreService } from '../../state/lender-invoice-request.store.service';

@Component({
    selector: 'request-list',
    templateUrl: './request-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestListPage implements OnInit {
    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    total$ = this.query.selectTotal();

    filters$ = this.query.selectFilters();

    pageIndex$ = this.query.selectPageIndex();

    pageSize$ = this.query.selectPageSize();

    entities$ = this.query.selectEntitiesWithUI();

    empty$ = this.query.selectEmpty();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private storeService: LenderInvoiceRequestStoreService,
        private query: LenderInvoiceRequestQuery
    ) {}

    ngOnInit() {
        this.fetchCurrentPage();
    }

    onChangeFilters(payload: LenderInvoiceRequestPaginationFiltersPayload) {
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
