import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ENTERPRISE_STATUS, EnterpriseUser, ToggleEnterpriseUserStatusPayload } from '@libera/models/enterprise';

import { EnterpriseUserEntity } from '../../store/reducers/entities.reducer';

@Component({
    selector: 'user-table',
    templateUrl: './user-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
    @Input() entities: EnterpriseUserEntity[];

    @Output() edit = new EventEmitter<number>();

    @Output() delete = new EventEmitter<number>();

    @Output() resend = new EventEmitter();

    @Output() toggleStatus = new EventEmitter<
        ToggleEnterpriseUserStatusPayload
    >();

    displayedColumns = [
        'name',
        'email',
        'date',
        'modules',
        'status',
        'actions',
    ];

    ENTERPRISE_STATUS = ENTERPRISE_STATUS;

    getName(entity: EnterpriseUserEntity): string {
        const { name, firstSurname, secondSurname } = entity.value;

        return [name, firstSurname, secondSurname]
            .filter(value => value)
            .join(' ');
    }

    shouldRenderStatus(entity: EnterpriseUserEntity): boolean {
        const { status } = entity.value;
        return (
            status == 'EVALUATION_PENDING' ||
            status == 'INCOMPLETE_ACCOUNT' ||
            status == 'PENDING_ACCOUNT_CONFIRMATION' ||
            status == 'REJECTED'
        );
    }

    isEnabled(entity: EnterpriseUserEntity): boolean {
        const { status } = entity.value;
        return status == 'ENABLED';
    }

    shouldRenderEditButton(entity: EnterpriseUserEntity): boolean {
        const { status } = entity.value;
        return status != 'DISABLED';
    }

    trackBy(index: number, item: EnterpriseUserEntity) {
        return item ? item.value.id : undefined;
    }

    onToggleStatus(entity: EnterpriseUserEntity, change: MatSlideToggleChange) {
        this.toggleStatus.emit({
            id: entity.value.id,
            enabled: change.checked,
        });
    }

    onEdit(entity: EnterpriseUserEntity) {
        this.edit.emit(entity.value.id);
    }

    onDelete(entity: EnterpriseUserEntity) {
        this.delete.emit(entity.value.id);
    }

    onResendInvitation({ id }: EnterpriseUser) {
        this.resend.emit(id);
    }

    isPendingAccountConfirmation({ status }: EnterpriseUser) {
        return status === 'PENDING_ACCOUNT_CONFIRMATION';
    }
}
