import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ENTERPRISE_MODULE_STATUS, EnterpriseModule, EnterpriseModuleStatus } from '@libera/models/enterprise';
import { StateWithUI } from '@mediomelon/ng-core';
import { EnterpriseModuleUI } from 'apps/enterprise/src/app/state/enterprise-modules/enterprise-module.store';

@Component({
    selector: 'module-table',
    templateUrl: './module-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleTableComponent {
    @Input() entities: StateWithUI<EnterpriseModule, EnterpriseModuleUI>[];

    @Input() canRequestModule: boolean;

    @Output() activate = new EventEmitter<EnterpriseModule>();

    ENTERPRISE_MODULE_STATUS = ENTERPRISE_MODULE_STATUS;

    displayedColumns = [
        'module',
        'status',
        'activationDate',
        'download',
        'actions',
    ];

    onActivate(module: EnterpriseModule) {
        this.activate.emit(module);
    }

    shouldRenderRequestActivationButton(status: EnterpriseModuleStatus) {
        return status === null && this.canRequestModule;
    }
}
