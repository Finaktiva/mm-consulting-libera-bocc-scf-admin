import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { EnterpriseRequestPaginationFilters } from '@libera/models/enterprise-request';
import { Observable } from 'rxjs';

import { EnterpriseRequestModuleQuery, EnterpriseRequestModuleWithUI } from '../../state/request-module.query';
import { EnterpriseRequestModuleStoreService } from '../../state/request-module.store.service';

@Component({
    selector: 'request-module-list',
    templateUrl: './module-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestModuleListPage implements OnInit {
    isLoading$: Observable<boolean> = this.query.selectLoading();

    pageIndex$: Observable<number> = this.query.selectPageIndex();

    pageSize$: Observable<number> = this.query.selectPageSize();

    total$: Observable<number> = this.query.selectTotal();

    filters$: Observable<
        EnterpriseRequestPaginationFilters
    > = this.query.selectFilters();

    entities$: Observable<
        EnterpriseRequestModuleWithUI[]
    > = this.query.selectEntitiesWithUI();

    error$: Observable<any> = this.query.selectError();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private storeService: EnterpriseRequestModuleStoreService,
        private query: EnterpriseRequestModuleQuery
    ) {}

    ngOnInit() {
        this.fetchCurrentPage();
    }

    onChangePage({ pageIndex: index, pageSize: size }: PageEvent) {
        this.storeService.changePage({ index, size }).subscribe();
    }

    fetchCurrentPage() {
        this.storeService.fetchCurrentPage().subscribe();
    }

    onUpdateFilters(filters: EnterpriseRequestPaginationFilters) {
        this.storeService.changeFilters(filters).subscribe();
    }
}
