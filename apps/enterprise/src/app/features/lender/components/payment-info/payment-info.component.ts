import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LenderInvoiceDetail } from '@libera/models/lender';

@Component({
    selector: 'payment-info',
    templateUrl: './payment-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentInfoComponent {
    @Input() entity: LenderInvoiceDetail;
}
