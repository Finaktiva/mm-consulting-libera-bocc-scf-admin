import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ENTERPRISE_REQUEST_STATUS } from '@libera/models/enterprise-request';

import { EnterpriseRequestLinkWithUI } from '../../state/request-link.query';

@Component({
    selector: 'request-link-table',
    templateUrl: './request-link-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestLinkTableComponent {
    @Input() entities: EnterpriseRequestLinkWithUI[];

    ENTERPRISE_REQUEST_STATUS = ENTERPRISE_REQUEST_STATUS;

    displayedColumns = [
        'enterpriseRequested',
        'nit',
        'email',
        'enterpriseRequester',
        'requestDate',
        'status',
    ];
}
