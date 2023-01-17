import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import {
    LenderListPaginationFilterPayload,
    lenderListPaginationFilterByType,
} from '@libera/models/lender';

import { LenderQuery } from '../../state/lender.query';
import { LenderStoreService } from '../../state/lender.store.service';
import { FilterOption } from '@libera/models/shared';

@Component({
    selector: 'lender-list-page',
    templateUrl: './list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LenderListPage implements OnInit {
    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    total$ = this.query.selectTotal();

    filters$ = this.query.selectFilters();

    pageIndex$ = this.query.selectPageIndex();

    pageSize$ = this.query.selectPageSize();

    entities$ = this.query.selectEntitiesWithUI();

    empty$ = this.query.selectEmpty();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    filterOptions: FilterOption[] = [
        {
            label: 'COMMON.FILTERS.SOCIAL_REASON',
            value: lenderListPaginationFilterByType.enterpriseName,
        },
        {
            label: 'COMMON.FILTERS.NIT',
            value: lenderListPaginationFilterByType.nit,
        },
    ];

    constructor(
        private storeService: LenderStoreService,
        private query: LenderQuery
    ) { }

    ngOnInit() {
        this.fetchCurrentPage();
    }

    onChangeFilters(payload: LenderListPaginationFilterPayload) {
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
