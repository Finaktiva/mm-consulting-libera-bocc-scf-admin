import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { CodePermission, ToggleUserStatusPayload, UserPaginationFilterPayload } from '@libera/models/user';
import { ProfileRolePermissionsQuery, RolePermissionsQuery } from '@libera/state';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { CreateUserDialog } from '../dialogs/create-user/create-user.dialog';
import { DeleteUserDialog } from '../dialogs/delete-user/delete-user.dialog';
import { UpdateUserDialog } from '../dialogs/update-user/update-user.dialog';
import { UserQuery } from '../state/user.query';
import { UserStoreService } from '../state/user.store.service';

@Component({
    selector: 'user-list-page',
    templateUrl: './list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPage implements OnInit {

    canManageUsers$: Observable<boolean> = this.profileQuery.hasPermission(CodePermission.MANAGE_BOCC_USERS);

    isLoadingPermission$ = this.profileQuery.selectLoading();

    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    total$ = this.query.selectTotal();

    filters$ = this.query.selectFilters();

    pageIndex$ = this.query.selectPageIndex();

    pageSize$ = this.query.selectPageSize();

    entities$ = this.query.selectEntitiesWithUI();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private dialog: MatDialog,
        private query: UserQuery,
        private storeService: UserStoreService,
        private profileQuery: ProfileRolePermissionsQuery,
    ) {}

    ngOnInit() {
        this.canManageUsers$.pipe(
            tap( canRender => {
                if(canRender) this.fetchCurrentPage();
            })
        ).subscribe();
    }

    onToggleStatus(payload: ToggleUserStatusPayload) {
        this.storeService.toggleStatus(payload).subscribe();
    }

    onChangeFilters(payload: UserPaginationFilterPayload) {
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

    onInvite(id: number) {
        this.storeService.invite(id).subscribe();
    }

    onOpenCreateUserDialog() {
        this.dialog.open(CreateUserDialog);
    }

    onOpenUpdateUserDialog(id: number) {
        this.dialog.open(UpdateUserDialog, { data: { id } });
    }

    onOpenDeleteUserDialog(id: number) {
        this.dialog.open(DeleteUserDialog, { data: { id } });
    }
}
