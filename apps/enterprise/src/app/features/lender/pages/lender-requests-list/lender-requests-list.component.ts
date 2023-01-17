import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import {
    LenderQuotaRequestListPaginationFilterPayload,
    LenderQuotaUpdateStatusFormPayload,
    LENDER_QUOTA_REQUEST_STATUS,
} from '@libera/models/lender-quota-request';
import { FilterConfig } from '@libera/shared';
import { Observable, Subscription } from 'rxjs';
import { LenderRequestsQuery } from '../../state/lender-requests.query';
import { LenderQuotaRequestWithUI } from '../../state/lender-requests.store';
import { LenderRequestsStoreService } from '../../state/lender-requests.store.service';
import { ApproveAssignedQuotaRequestComponent } from '../../dialogs/approve-assigned-quota-request/approve-assigned-quota-request.component';
import { ENTERPRISE_REQUEST_PAGINATION_FILTER_BY } from '@libera/models/enterprise-request';
import { RejectAssignedQuotaRequestComponent } from '../../dialogs/reject-assigned-quota-request/reject-assigned-quota-request.component';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, map } from 'rxjs/operators';

@Component({
    selector: 'lender-requests-list',
    templateUrl: './lender-requests-list.component.html',
})
export class LenderRequestsListComponent implements OnInit {
    entities$: Observable<
        LenderQuotaRequestWithUI[]
    > = this.query.selectEntitiesWithUI();

    isLoading$: Observable<boolean> = this.query.selectLoading();
    error$: Observable<any> = this.query.selectError();

    pageSize$: Observable<number> = this.query.selectPageSize();
    pageIndex$: Observable<number> = this.query.selectPageIndex();
    total$: Observable<number> = this.query.selectTotal();

    filters$: Observable<
        LenderQuotaRequestListPaginationFilterPayload
    > = this.query.selectFilters();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    filterConfig: FilterConfig = {
        filterOptions: [
            {
                label: 'COMMON.LABELS.SOCIAL_REASON',
                value: 'enterpriseName',
            },
            {
                label: 'COMMON.LABELS.STATUS',
                value: 'status',
            },
        ],
        filters: [
            {
                type: 'QUERY',
                label: 'COMMON.LABELS.SOCIAL_REASON',
                renderWhenIs: 'enterpriseName',
            },
            {
                type: 'SELECT',
                label: 'COMMON.LABELS.STATUS',
                renderWhenIs: 'status',
                options: [
                    {
                        label: 'LENDER_REQUEST_LIST.APPROVED',
                        value: LENDER_QUOTA_REQUEST_STATUS.APPROVED,
                    },
                    {
                        label: 'LENDER_REQUEST_LIST.REJECT',
                        value: LENDER_QUOTA_REQUEST_STATUS.REJECTED,
                    },
                    {
                        label: 'LENDER_REQUEST_LIST.NEW',
                        value:
                            LENDER_QUOTA_REQUEST_STATUS.PENDING_LENDER_APPROVAL,
                    },
                    {
                        label: 'LENDER_REQUEST_LIST.QUOTA',
                        value:
                            LENDER_QUOTA_REQUEST_STATUS.PENDING_PAYER_APPROVAL,
                    },
                ],
            },
        ],
    };

    constructor(
        private query: LenderRequestsQuery,
        private storeService: LenderRequestsStoreService,
        private dialog: MatDialog,
        private translateService: TranslateService
    ) {}

    ngOnInit() {
        this.fetchCurrentPage();
    }

    fetchCurrentPage() {
        this.storeService.fetchCurrentPage().subscribe();
    }

    onChangePage(page: PageEvent) {
        this.storeService
            .changePage({
                index: page.pageIndex,
                size: page.pageSize,
            })
            .subscribe();
    }

    onFilterChange(filters: LenderQuotaRequestListPaginationFilterPayload) {
        this.storeService.changeFilters(filters).subscribe();
    }

    onUpdateRequestStatus(data: LenderQuotaUpdateStatusFormPayload) {
        switch (data.status) {
            case 'APPROVED':
                this.dialog.open(ApproveAssignedQuotaRequestComponent, {
                    data,
                });
                return;
            case 'REJECTED':
                this.dialog.open(RejectAssignedQuotaRequestComponent, {
                    data,
                });
                return;
        }
    }
}
