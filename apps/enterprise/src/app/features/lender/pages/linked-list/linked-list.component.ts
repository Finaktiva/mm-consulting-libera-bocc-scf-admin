import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import {
    lenderListPaginationFilterByType,
    LenderOrderedListPaginationFilterPayload,
    LinkedLender,
    AdjustmentRequestType,
    adjustmentRequestType,
} from '@libera/models/lender';
import { FilterOption } from '@libera/models/shared';
import { StateWithUI, UIState } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { LinkedLenderQuery } from '../../state/linked-lender.query';
import { LinkedLenderStoreService } from '../../state/linked-lender.store.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateQuotaDialogComponent } from '../../dialogs/update-quota-dialog/update-quota-dialog.component';
import { RequestQuotaExpansionDialogComponent } from '../../dialogs/request-quota-expansion-dialog/request-quota-expansion-dialog.component';

@Component({
    selector: 'linked-list',
    templateUrl: './linked-list.component.html',
})
export class LinkedListComponent implements OnInit {
    isLoading$: Observable<boolean> = this.linkedLenderQuery.selectLoading();
    error$: Observable<any> = this.linkedLenderQuery.selectError();

    pageSize$: Observable<number> = this.linkedLenderQuery.selectPageSize();
    total$: Observable<number> = this.linkedLenderQuery.selectTotal();
    pageIndex$: Observable<number> = this.linkedLenderQuery.selectPageIndex();

    entities$: Observable<
        StateWithUI<LinkedLender, UIState>[]
    > = this.linkedLenderQuery.selectEntitiesWithUI();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    filterOptions: FilterOption[] = [
        {
            label: 'COMMON.LABELS.SOCIAL_REASON',
            value: lenderListPaginationFilterByType.enterpriseName,
        },
        {
            label: 'COMMON.LABELS.NIT',
            value: lenderListPaginationFilterByType.nit,
        },
    ];

    constructor(
        private linkedLenderStoreService: LinkedLenderStoreService,
        private linkedLenderQuery: LinkedLenderQuery,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.fetchCurrentPage();
    }

    fetchCurrentPage() {
        this.linkedLenderStoreService.fetchCurrentPage().subscribe();
    }

    onChangePage(page: PageEvent) {
        this.linkedLenderStoreService
            .changePage({
                index: page.pageIndex,
                size: page.pageSize,
            })
            .subscribe();
    }

    onFilterChange(filters: LenderOrderedListPaginationFilterPayload) {
        this.linkedLenderStoreService.changeFilters(filters).subscribe();
    }

    onUpdateQuota(id: number) {
        this.dialog.open(UpdateQuotaDialogComponent, { data: { id } });
    }

    onRequestQuotaExpansion(id: number) {
        this.dialog.open(RequestQuotaExpansionDialogComponent, {
            data: { id },
        });
    }
}
