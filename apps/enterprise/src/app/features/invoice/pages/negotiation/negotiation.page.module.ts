import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertModule } from '@libera/shared';

import { NegotiationFormModule } from '../../components/negotiation-form/negotiation-form.module';
import { NegotiationLogPanelModule } from '../../components/negotiation-log-panel/negotiation-log-panel.module';
import { NegotiationOfferCardModule } from '../../components/negotiation-offer-card/negotiation-offer-card.module';
import { PayerAcceptOfferDialogModule } from '../../dialogs/payer-accept-offer/payer-accept-offer.dialog.module';
import { PayerCancelNegotiationDialogModule } from '../../dialogs/payer-cancel-negotiation/payer-cancel-negotiation.dialog.module';
import { PayerRejectOfferDialogModule } from '../../dialogs/payer-reject-offer/payer-reject-offer.dialog.module';
import { NegotiationPage } from './negotiation.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatDividerModule,
        MatExpansionModule,
        NegotiationOfferCardModule,
        AlertModule,
        NegotiationFormModule,
        PayerAcceptOfferDialogModule,
        PayerRejectOfferDialogModule,
        PayerCancelNegotiationDialogModule,
        NegotiationLogPanelModule,
        TranslateModule,
        MatIconModule,
    ],
    declarations: [NegotiationPage],
    exports: [NegotiationPage],
})
export class NegotiationPageModule {}
