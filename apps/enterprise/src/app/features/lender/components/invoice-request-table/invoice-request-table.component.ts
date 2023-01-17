import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LENDER_INVOICE_STATUS } from '@libera/models/lender';

import { LenderInvoiceRequestWithUI } from '../../state/lender-invoice-request.query';

@Component({
    selector: 'invoice-request-table',
    templateUrl: './invoice-request-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceRequestTableComponent {
    @Input() entities: LenderInvoiceRequestWithUI[];

    displayedColumns = [
        'enterpriseName',
        'nit',
        'invoiceNumber',
        'discountValue',
        'expectedPaymentDate',
        'discountDueDate',
        'effectivePaymentDate',
        'status',
    ];

    LENDER_INVOICE_STATUS = LENDER_INVOICE_STATUS;
}
