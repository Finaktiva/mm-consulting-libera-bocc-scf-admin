import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';

import { ProviderBulkQuery } from '../../state/provider-bulk.query';
import { ProviderStoreService } from '../../state/provider.store.service';

@Component({
    selector: 'bulk-list',
    templateUrl: './bulk-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderBulkListPage implements OnInit {
    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    total$ = this.query.selectTotal();

    pageIndex$ = this.query.selectPageIndex();

    pageSize$ = this.query.selectPageSize();

    entities$ = this.query.selectEntitiesWithUI();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private query: ProviderBulkQuery,
        private storeService: ProviderStoreService
    ) {}

    ngOnInit() {
        this.fetchCurrentPage();
    }

    onChangePage(payload: PageEvent) {
        this.storeService
            .changeBulkPage({
                index: payload.pageIndex,
                size: payload.pageSize,
            })
            .subscribe();
    }

    fetchCurrentPage(force?: boolean) {
        this.storeService.fetchCurrentBulkPage(force).subscribe();
    }
}
