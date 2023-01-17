import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertModule } from '@libera/shared';

import { NegotiationFormModule } from '../../components/negotiation-form/negotiation-form.module';
import { NegotiationOfferCardModule } from '../../components/negotiation-offer-card/negotiation-offer-card.module';
import { ProviderAcceptOfferDialogModule } from '../../dialogs/provider-accept-offer/provider-accept-offer.dialog.module';
import { ProviderRejectOfferDialogModule } from '../../dialogs/provider-reject-offer/provider-reject-offer.dialog.module';
import { ProviderNegotiationPage } from './provider-negotiation.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        NegotiationOfferCardModule,
        MatDialogModule,
        MatExpansionModule,
        MatDividerModule,
        MatButtonModule,
        AlertModule,
        NegotiationFormModule,
        ProviderAcceptOfferDialogModule,
        ProviderRejectOfferDialogModule,
        TranslateModule,
        MatIconModule,
    ],
    declarations: [ProviderNegotiationPage],
    exports: [ProviderNegotiationPage],
})
export class ProviderNegotiationPageModule { }
