import { EnabledRoleDialog } from '../../dialogs/enabled-role/enabled-role.dialog';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { USER_STATUS, UserRole, CodePermission } from '@libera/models/user';
import { ProfileRolePermissionsQuery, UserRoleQuery, UserRolesService } from '@libera/state';
import { Observable, combineLatest } from 'rxjs';
import { CreateRoleDialog } from '../../dialogs/create-role-dialog/create-role.dialog';
import { map } from 'rxjs/operators';



@Component({
    selector: 'role-table',
    templateUrl: './role-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleTableComponent {

    canUpdateRole$: Observable<boolean> = this.profileQuery.hasPermission(CodePermission.UPDATE_ROLE);

    canEnableDisableRole$: Observable<boolean> = this.profileQuery.hasPermission(CodePermission.ENABLE_OR_DISABLE_ROLE);

    shouldRenderActions$: Observable<boolean>;

    private withActions = [
        'name',
        'acronym',
        'creationDate',
        'modificationDate',
        'status',
        'actions'
    ];

    private withoutActions = [
        'name',
        'acronym',
        'creationDate',
        'modificationDate',
        'status',
    ];

    constructor(
        private storeServices: UserRolesService,
        private query: UserRoleQuery,
        private dialog: MatDialog,
        private profileQuery: ProfileRolePermissionsQuery,
    ) {}


    @Input() roles: UserRole[]
    @Input() isLoading$: Observable<boolean>

    USER_STATUS = USER_STATUS;


    ngOnInit(): void {
        this.shouldRenderActions$ = combineLatest(
            this.canUpdateRole$,
            this.canEnableDisableRole$,
        ).pipe(map(x => x.some(Boolean)));
    }

    enabledAction(entity){
        const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = { rol: entity }
            const dialogRef = this.dialog.open(EnabledRoleDialog, dialogConfig);
            dialogRef.afterClosed().subscribe();
    }

    edit(role: UserRole){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { userRole: role, action: 'EDIT' }
        const dialogRef = this.dialog.open(CreateRoleDialog, dialogConfig);
        dialogRef.afterClosed().subscribe();
    }

    get displayedColumns(): string[] {
        let renderActions: string[] = []
        this.shouldRenderActions$.pipe(
            map(render => renderActions = (render ?  this.withActions : this.withoutActions))
        ).subscribe();
        return renderActions
    }
}
