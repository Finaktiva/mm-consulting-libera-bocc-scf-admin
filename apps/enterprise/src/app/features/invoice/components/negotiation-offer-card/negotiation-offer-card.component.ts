import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NEGOTIATION_DISCOUNT_TYPE, NegotiationOffer } from '@libera/models/shared';

@Component({
    selector: 'negotiation-offer-card',
    templateUrl: './negotiation-offer-card.component.html',
    styleUrls: ['./negotiation-offer-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NegotiationOfferCardComponent {
    @Input() offer: NegotiationOffer;

    @Input() currencyCode: string;

    @Input() invoiceAmount: number;

    NEGOTIATION_DISCOUNT_TYPE = NEGOTIATION_DISCOUNT_TYPE;
}
