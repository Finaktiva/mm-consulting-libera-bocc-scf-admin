import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LenderInvoiceDetail } from '@libera/models/lender';

@Component({
    selector: 'invoice-request-info',
    templateUrl: './invoice-request-info.component.html',
    styleUrls: ['./invoice-request-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceRequestInfoComponent {
    @Input() entity: LenderInvoiceDetail;
}
