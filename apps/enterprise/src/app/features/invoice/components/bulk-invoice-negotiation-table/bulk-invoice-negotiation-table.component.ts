import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PayerBulkInvoiceNegotiationWithUI } from '../../state/payer-bulk-invoice-negotiation.query';
import { ProviderBulkInvoiceNegotiationWithUI } from '../../state/provider-bulk-invoice-negotiation.query';

@Component({
    selector: 'bulk-invoice-negotiation-table',
    templateUrl: './bulk-invoice-negotiation-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkInvoiceNegotiationTableComponent {
    @Input() entities:
        | PayerBulkInvoiceNegotiationWithUI[]
        | ProviderBulkInvoiceNegotiationWithUI[];

    @Input() type: 'PROVIDER' | 'PAYER';

    displayedColumns = [
        'folio',
        'enterpriseName',
        'count',
        'amount',
        'creationDate',
        'status',
    ];
}
