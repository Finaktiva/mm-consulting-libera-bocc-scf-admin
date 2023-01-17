import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Payer } from '@libera/models/payer';

@Component({
    selector: 'payer-basic-information',
    templateUrl: './payer-basic-information.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerBasicInformationComponent {
    @Input() entity: Payer;
}
