import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Enterprise, ENTERPRISE_MODULES, ENTERPRISE_STATUS } from '@libera/models/enterprise';
import { UserRoleUI } from '@libera/state';
import { StateWithUI } from '@mediomelon/ng-core';

@Component({
    selector: 'program-table',
    templateUrl: './program-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramTableComponent {
    @Input() entities: StateWithUI<Enterprise, UserRoleUI>[];

    @Output() invite = new EventEmitter<number>();

    displayedColumns: string[] = [
        'enterpriseName',
        'documentType',
        'nit',
        'regional',
        'email',
        'activeModules',
        'vinculationDate',
        'status',
        'actions',
    ];

    ENTERPRISE_STATUS = ENTERPRISE_STATUS;

    ENTERPRISE_MODULES = ENTERPRISE_MODULES;

    onResendInvitation(enterprise: Enterprise) {
        this.invite.emit(enterprise.id);
    }

    shouldRenderMenu({ status }: Enterprise) {
        return status === 'PENDING_ACCOUNT_CONFIRMATION';
    }

    shouldRenderInviteButton({ status }: Enterprise) {
        return status === 'PENDING_ACCOUNT_CONFIRMATION';
    }
}
