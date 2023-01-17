import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ParamMap } from '@angular/router';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { EnterpriseRequestPaginationFilters, EnterpriseRequestType } from '@libera/models/enterprise-request';
import { CodePermission } from '@libera/models/user';
import { ProfileRolePermissionsQuery } from '@libera/state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EnterpriseRequestLinkQuery, EnterpriseRequestLinkWithUI } from '../../state/request-link.query';
import { EnterpriseRequestLinkStoreService } from '../../state/request-link.store.service';

@Component({
    selector: 'request-link-list',
    templateUrl: './link-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestLinkListPage implements OnInit {
    isLoading$: Observable<boolean> = this.query.selectLoading();

    pageIndex$: Observable<number> = this.query.selectPageIndex();

    pageSize$: Observable<number> = this.query.selectPageSize();

    total$: Observable<number> = this.query.selectTotal();

    shouldRenderRequest$: Observable<boolean> = this.profileQuery.hasPermission(CodePermission.READ_ENTERPRISE_LINKINGS_LIST);

    isLoadingPermission$ = this.profileQuery.selectLoading();

    filters$: Observable<
        EnterpriseRequestPaginationFilters
    > = this.query.selectFilters();

    entities$: Observable<
        EnterpriseRequestLinkWithUI[]
    > = this.query.selectEntitiesWithUI();

    error$: Observable<any> = this.query.selectError();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private storeService: EnterpriseRequestLinkStoreService,
        private query: EnterpriseRequestLinkQuery,
        private profileQuery: ProfileRolePermissionsQuery,
    ) {}

    ngOnInit() {
        this.shouldRenderRequest$.pipe(
            tap( canRender => {
                if(canRender) this.fetchCurrentPage();
            })
        ).subscribe();
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
