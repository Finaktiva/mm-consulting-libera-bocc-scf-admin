import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { EnterpriseProviderBulk } from '@libera/models/enterprise';
import { ENTERPRISE_PROVIDER_BULK_STATUS } from '@libera/models/enterprise';
import { StateWithUI, UIState } from '@mediomelon/ng-core';

@Component({
    selector: 'provider-bulk-table',
    templateUrl: './provider-bulk-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderBulkTableComponent {
    @Input() entities: StateWithUI<EnterpriseProviderBulk, UIState>[];

    displayedColumns: string[] = [
        'folio',
        'file',
        'creationDate',
        'providers',
        'status',
    ];

    ENTERPRISE_PROVIDER_BULK_STATUS = ENTERPRISE_PROVIDER_BULK_STATUS;
}
