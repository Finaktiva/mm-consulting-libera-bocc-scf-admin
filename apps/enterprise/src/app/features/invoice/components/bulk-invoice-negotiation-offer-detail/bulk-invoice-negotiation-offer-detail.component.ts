import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BulkInvoiceNegotiationOffer, Invoice } from '@libera/models/bulk-invoice-negotiation';

@Component({
    selector: 'bulk-invoice-negotiation-offer-detail',
    templateUrl: './bulk-invoice-negotiation-offer-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkInvoiceNegotiationOfferDetailComponent {
    @Input() provider: string;

    @Input() lender: string;

    @Input() total: number;

    @Input() availableQuota: number;

    @Input() offer: BulkInvoiceNegotiationOffer;

    @Input() type: 'PAYER' | 'PROVIDER';

    @Input() shouldRenderQuota: boolean;

    calculateRemainingQuota(): number {
        return this.availableQuota - (this.total - this.offer.discountValue);
    }
}
