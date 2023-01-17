import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToggleUserStatusPayload, User, USER_STATUS, UserStatus, CodePermission } from '@libera/models/user';
import { ProfileRolePermissionsQuery } from '@libera/state';
import { StateWithUI } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserUI } from '../../state/user.store';

@Component({
    selector: 'user-table',
    templateUrl: './user-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
    @Input() entities: StateWithUI<User, UserUI>[];

    @Output() invite = new EventEmitter<number>();

    @Output() update = new EventEmitter<number>();

    @Output() delete = new EventEmitter<number>();

    @Output() toggleStatus = new EventEmitter<ToggleUserStatusPayload>();

    canEnableOrDisableUser$: Observable<boolean> = this.profileQuery.hasPermission(CodePermission.ENABLE_OR_DISABLE_BOCC_USER);

    private withToggle = [
        'name',
        'email',
        'vinculationDate',
        'roles',
        'status',
        'toggle',
        'actions',
    ];

    private withoutToggle = [
        'name',
        'email',
        'vinculationDate',
        'roles',
        'status',
        'actions',
    ];

    USER_STATUS = USER_STATUS;

    hasPermission: boolean;

    constructor(
        private profileQuery: ProfileRolePermissionsQuery,
    ){
        this.canEnableOrDisableUser$.pipe(
            tap( hasPermission => this.hasPermission = hasPermission)
        ).subscribe();
    }

    onInvite(id: number) {
        this.invite.emit(id);
    }

    onUpdate(id: number) {
        this.update.emit(id);
    }

    onDelete(id: number) {
        this.delete.emit(id);
    }

    trackBy(index: number, item: User) {
        return item ? item.id : undefined;
    }

    onToggleStatus(user: User, change: MatSlideToggleChange) {
        this.toggleStatus.emit({
            id: user.id,
            enabled: change.checked,
        });
    }

    shouldRenderInviteButton(entity: User) {
        return entity.status === USER_STATUS.PENDING_ACCOUNT_CONFIRMATION;
    }

    shouldRenderToggleButton(status: UserStatus) {
        return status == 'ENABLED' || status == 'DISABLED';
    }

    isEnabled(user: User): boolean {
        const { status } = user;
        return status == 'ENABLED';
    }

    get displayedColumns() {
        return this.hasPermission ? this.withToggle : this.withoutToggle;
    }
}
