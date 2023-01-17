import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';

import { BulkInvoiceNegotiationCancelOfferDialog } from './bulk-invoice-negotiation-cancel-offer.dialog';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatButtonModule,
        MatDialogModule,
        TranslateModule,
    ],
    declarations: [BulkInvoiceNegotiationCancelOfferDialog],
    entryComponents: [BulkInvoiceNegotiationCancelOfferDialog],
    exports: [BulkInvoiceNegotiationCancelOfferDialog],
})
export class BulkInvoiceNegotiationCancelOfferDialogModule {}
