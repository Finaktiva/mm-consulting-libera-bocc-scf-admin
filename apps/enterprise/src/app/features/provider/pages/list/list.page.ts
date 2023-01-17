import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmCloseDialog } from '@libera/base';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { EnterpriseProviderFilterPayload } from '@libera/models/enterprise';
import { AuthenticationQuery, EnterpriseQuery, EnterpriseStoreService } from '@libera/state';

import { AddProviderDialog } from '../../dialogs/add-provider/add-provider.dialog';
import { ProviderQuery } from '../../state/provider.query';
import { ProviderStoreService } from '../../state/provider.store.service';

@Component({
    selector: 'provider-list',
    templateUrl: './list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderListPage implements OnInit {
    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    total$ = this.query.selectTotal();

    filters$ = this.query.selectFilters();

    pageIndex$ = this.query.selectPageIndex();

    pageSize$ = this.query.selectPageSize();

    entities$ = this.query.selectEntitiesWithUI();

    empty$ = this.query.selectEmpty();

    entity$ = this.enterpriseQuery.selectEntity(
        this.authenticationQuery.getEnterpriseId()
    );

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private dialog: MatDialog,
        private storeService: ProviderStoreService,
        private query: ProviderQuery,
        private enterpriseStoreService: EnterpriseStoreService,
        private enterpriseQuery: EnterpriseQuery,
        private authenticationQuery: AuthenticationQuery,
    ) {}

    ngOnInit() {
        this.fetchCurrentPage();
        this.fetchEnterprise();
    }

    fetchEnterprise() {
        this.enterpriseStoreService
            .fetch(this.authenticationQuery.getEnterpriseId())
            .subscribe();
    }

    onChangeFilters(payload: EnterpriseProviderFilterPayload) {
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

    onOpenProviderDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { entity$: this.entity$ }
        this.dialog.open(AddProviderDialog, dialogConfig);
    }
}
