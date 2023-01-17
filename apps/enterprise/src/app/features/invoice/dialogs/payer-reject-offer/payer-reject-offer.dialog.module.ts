import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PayerRejectOfferDialog } from './payer-reject-offer.dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressBarModule,
        TranslateModule
    ],
    declarations: [PayerRejectOfferDialog],
    entryComponents: [PayerRejectOfferDialog],
    exports: [PayerRejectOfferDialog],
})
export class PayerRejectOfferDialogModule { }
