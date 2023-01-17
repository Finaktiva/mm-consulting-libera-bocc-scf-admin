import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DividePipeModule } from '@libera/shared';

import { NegotiationOfferCardComponent } from './negotiation-offer-card.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        MatDividerModule,
        DividePipeModule,
        TranslateModule
    ],
    declarations: [NegotiationOfferCardComponent],
    exports: [NegotiationOfferCardComponent],
})
export class NegotiationOfferCardModule {}
