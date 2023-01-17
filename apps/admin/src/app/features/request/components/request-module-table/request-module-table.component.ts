import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ENTERPRISE_MODULES } from '@libera/models/enterprise';
import { ENTERPRISE_REQUEST_STATUS } from '@libera/models/enterprise-request';

import { EnterpriseRequestModuleWithUI } from '../../state/request-module.query';

@Component({
    selector: 'request-module-table',
    templateUrl: './request-module-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestModuleTableComponent {
    @Input() entities: EnterpriseRequestModuleWithUI[];

    ENTERPRISE_REQUEST_STATUS = ENTERPRISE_REQUEST_STATUS;

    displayedColumns = [
        'enterpriseName',
        'nit',
        'email',
        'activeModules',
        'documentation',
        'requestDate',
        'status',
    ];

    ENTERPRISE_MODULES = ENTERPRISE_MODULES;
}
