import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { INVOICE_STATUS } from '@libera/models/shared';

import { ProviderInvoiceWithUI } from '../../state/provider-invoice.query';

@Component({
    selector: 'provider-invoice-table',
    templateUrl: './provider-invoice-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderInvoiceTableComponent {
    @Input() entities: ProviderInvoiceWithUI[];

    INVOICE_STATUS = INVOICE_STATUS;

    displayedColumns = [
        'invoiceNumber',
        'invoiceValue',
        'payer',
        'nit',
        'startingDate',
        'discountDueDate',
        'effectivePaymentDate',
        'discountPercentage',
        'discountValue',
        'status',
    ];
}
