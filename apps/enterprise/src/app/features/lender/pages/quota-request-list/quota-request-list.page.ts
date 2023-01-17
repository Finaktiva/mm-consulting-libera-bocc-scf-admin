import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import {
    LenderQuotaRequestListPaginationFilterPayload,
    LenderQuotaRequestPayload,
} from '@libera/models/lender-quota-request';
import { RejectQuotaRequestDialog } from '../../dialogs/reject-quota-request/reject-quota-request.dialog';
import { UpdateQuotaRequestDialog } from '../../dialogs/update-quota-request/update-quota-request.dialog';
import { LenderQuotaRequestQuery } from '../../state/lender-quota-request.query';
import { LenderQuotaRequestStoreService } from '../../state/lender-quota-request.store.service';
import { AssignQuotaRequestDialog } from '../../dialogs/assign-quota-request/assign-quota-request.dialog';

@Component({
    selector: 'quota-request-list-page',
    templateUrl: './quota-request-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotaRequestListPage implements OnInit {
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
        private storeService: LenderQuotaRequestStoreService,
        private query: LenderQuotaRequestQuery,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.fetchCurrentPage();
    }

    onToggleExpansion(id: number) {
        this.storeService.toggleExpansion(id);
    }

    onChangeFilters(payload: LenderQuotaRequestListPaginationFilterPayload) {
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

    onOpenUpdateDialog({
        id,
        payload,
    }: {
        id: number;
        payload: LenderQuotaRequestPayload;
    }) {
        this.dialog.open(UpdateQuotaRequestDialog, { data: { id, payload } });
    }

    onOpenAssignDialog(data: {
        id: number;
        payload: LenderQuotaRequestPayload;
    }) {
        this.dialog.open(AssignQuotaRequestDialog, { data });
    }

    onOpenRejectDialog(id: number) {
        this.dialog.open(RejectQuotaRequestDialog, { data: { id } });
    }
}
