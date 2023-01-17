import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ENTERPRISE_LINK_STATUS, EnterpriseProvider } from '@libera/models/enterprise';
import { StateWithUI } from '@mediomelon/ng-core';

import { EnterpriseProviderUI } from '../../state/provider.store';

@Component({
    selector: 'provider-table',
    templateUrl: './provider-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderTableComponent {
    @Input() entities: StateWithUI<EnterpriseProvider, EnterpriseProviderUI>[];

    ENTERPRISE_LINK_STATUS = ENTERPRISE_LINK_STATUS;

    displayedColumns = [
        'name',
        'nit',
        'email',
        'contact',
        'phone',
        'vinculationDate',
        'status',
    ];
}
