import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { RoleFilterPayload } from '@libera/models/role';
import { CodePermission, UserRole } from '@libera/models/user';
import { ProfileRolePermissionsQuery, UserRoleQuery, UserRolesService } from '@libera/state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateRoleDialog } from '../dialogs/create-role-dialog/create-role.dialog';


@Component({
    selector: 'role-list-page',
    templateUrl: './list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListPage implements OnInit {

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    shouldRenderPage$: Observable<boolean> = this.profileQuery.hasPermission(CodePermission.READ_ROLE_LIST);
    
    canCreateRole$: Observable<boolean> = this.profileQuery.hasPermission(CodePermission.CREATE_ROLE);

    isLoadingPermission$ = this.profileQuery.selectLoading();

    roles$ = this.query.selectEntitiesWithUI();

    isLoading$: Observable<boolean> = this.query.selectLoading()

    pageSize$ = this.query.selectPageSize();

    total$ = this.query.selectTotal();

    pageIndex$ = this.query.selectPageIndex();

    filters$ = this.query.selectFilters();

    constructor(
        private dialog: MatDialog,
        private query: UserRoleQuery,
        private profileQuery: ProfileRolePermissionsQuery,
        private storeServices: UserRolesService
    ) {}

    ngOnInit() {
        this.shouldRenderPage$.pipe(
            tap( canRender => {
                if(canRender) this.storeServices.fetchCurrentPage().subscribe();
            })
        ).subscribe();
    }

    createRole() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { action: 'CREATE' }
        const dialogRef = this.dialog.open(CreateRoleDialog, dialogConfig);
        dialogRef.afterClosed().subscribe();
    }

    onChangeFilters(payload: RoleFilterPayload) {
        this.storeServices.changeFilters(payload).subscribe();
    }

    onChangePage(payload: PageEvent) {
        this.storeServices
            .changePage({
                index: payload.pageIndex,
                size: payload.pageSize,
            })
            .subscribe();
    }

}
