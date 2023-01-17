import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { EnterpriseSector } from '@libera/models/catalog';
import { PayerListPaginationFilterPayload } from '@libera/models/payer';
import {
    EnterpriseSectorQuery,
    EnterpriseSectorStoreService,
} from '@libera/state';
import { Observable } from 'rxjs';
import { PayerQuery } from '../../state/payer.query';
import { PayerStoreService } from '../../state/payer.store.service';

@Component({
    selector: 'payer-list',
    templateUrl: './payer-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerListPage implements OnInit {
    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    total$ = this.query.selectTotal();

    filters$ = this.query.selectFilters();

    pageIndex$ = this.query.selectPageIndex();

    pageSize$ = this.query.selectPageSize();

    entities$ = this.query.selectEntitiesWithUI();

    empty$ = this.query.selectEmpty();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    enterpriseSectors$: Observable<
        EnterpriseSector[]
    > = this.enterpriseQuery.selectEntities();

    constructor(
        private query: PayerQuery,
        private storeService: PayerStoreService,
        private enterpriseQuery: EnterpriseSectorQuery,
        private enterpriseSectorStoreService: EnterpriseSectorStoreService
    ) {}

    ngOnInit() {
        this.fetchCurrentPage();
        this.enterpriseSectorStoreService.fetchAll().subscribe();
    }

    onChangeFilters(payload: PayerListPaginationFilterPayload) {
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
