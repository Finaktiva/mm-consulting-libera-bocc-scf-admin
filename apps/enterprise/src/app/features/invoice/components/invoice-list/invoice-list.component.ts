import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Invoice } from '@libera/models/bulk-invoice-negotiation';

@Component({
    selector: 'invoice-list',
    templateUrl: './invoice-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListComponent {
    @Input() invoices: Invoice[];

    displayedColumns: string[] = [
        'invoiceNumber',
        'provider',
        'nit',
        'expirationDate',
        'amount',
    ];
}
