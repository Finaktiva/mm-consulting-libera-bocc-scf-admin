import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';

import {
    BulkInvoiceNegotiationCounterOfferFormModule,
} from '../../components/bulk-invoice-negotiation-counter-offer-form/bulk-invoice-negotiation-counter-offer-form.module';
import { ProviderBulkInvoiceNegotiationCounterOfferDialog } from './provider-bulk-invoice-negotiation-counter-offer.dialog';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatDialogModule,
        MatProgressBarModule,
        MatButtonModule,
        BulkInvoiceNegotiationCounterOfferFormModule,
        TranslateModule,
    ],
    declarations: [ProviderBulkInvoiceNegotiationCounterOfferDialog],
    entryComponents: [ProviderBulkInvoiceNegotiationCounterOfferDialog],
    exports: [ProviderBulkInvoiceNegotiationCounterOfferDialog],
})
export class ProviderBulkInvoiceNegotiationCounterOfferDialogModule {}
