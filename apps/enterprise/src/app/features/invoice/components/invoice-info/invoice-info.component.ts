import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProviderInvoice } from '@libera/models/provider';
import { INVOICE_DOCUMENT_TYPE, INVOICE_PAYMENT_TYPE } from '@libera/models/shared';

@Component({
    selector: 'invoice-info',
    templateUrl: 'invoice-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceInfoComponent {
    @Input() entity: ProviderInvoice;

    INVOICE_DOCUMENT_TYPE = INVOICE_DOCUMENT_TYPE;

    INVOICE_PAYMENT_TYPE = INVOICE_PAYMENT_TYPE;
}
