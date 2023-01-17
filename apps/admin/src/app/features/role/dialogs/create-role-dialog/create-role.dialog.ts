import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolePermission } from '@libera/models/catalog';
import { UserRole } from '@libera/models/user';
import { RolePermissionsQuery, RolePermissionsService, UserRoleQuery } from '@libera/state';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'create-role-dialog',
    templateUrl: './create-role.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRoleDialog {
    isLoadingRole$ = this.roleQuery.selectLoading();
    isLoadingPermissions$ = this.query.selectLoading();
    permissions$: Observable<RolePermission[]>;
    
    constructor(
        private dialogRef: MatDialogRef<CreateRoleDialog>,
        private query: RolePermissionsQuery,
        private roleQuery: UserRoleQuery,
        @Inject(MAT_DIALOG_DATA) public data: { userRole: UserRole, action: string },
    ) {}

}
