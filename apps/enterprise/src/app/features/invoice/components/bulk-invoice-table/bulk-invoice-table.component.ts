import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BULK_INVOICE_STATUS } from '@libera/models/bulk-invoice';

import { BulkInvoiceWithUI } from '../../state/bulk-invoice.query';

@Component({
    selector: 'bulk-invoice-table',
    templateUrl: './bulk-invoice-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkInvoiceTableComponent {
    @Input() entities: BulkInvoiceWithUI[];

    @Output() refresh = new EventEmitter<number>();

    BULK_INVOICE_STATUS = BULK_INVOICE_STATUS;

    displayedColumns = [
        'folio',
        'fileName',
        'creationDate',
        'count',
        'status',
        'actions',
    ];

    onRefresh(id: number) {
        this.refresh.emit(id);
    }
}
