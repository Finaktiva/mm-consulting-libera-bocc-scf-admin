import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PayerAcceptOfferDialog } from './payer-accept-offer.dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        MatDialogModule,
        TranslateModule
    ],
    declarations: [PayerAcceptOfferDialog],
    entryComponents: [PayerAcceptOfferDialog],
    exports: [PayerAcceptOfferDialog],
})
export class PayerAcceptOfferDialogModule { }
