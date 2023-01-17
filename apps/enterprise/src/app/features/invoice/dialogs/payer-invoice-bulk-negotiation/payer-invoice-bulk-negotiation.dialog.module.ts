import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DividePipeModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';

import {
    BulkInvoiceNegotiationFormModule,
} from '../../components/bulk-invoice-negotiation-form/bulk-invoice-negotiation-form.module';
import { BulkInvoiceNegotiationConfirmationDialog } from './bulk-invoice-negotiation-confirmation.dialog';
import { PayerInvoiceBulkNegotiationDialog } from './payer-invoice-bulk-negotiation.dialog';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatDialogModule,
        MatButtonModule,
        MatDividerModule,
        MatProgressBarModule,
        BulkInvoiceNegotiationFormModule,
        TranslateModule,
        DividePipeModule,
    ],
    declarations: [
        PayerInvoiceBulkNegotiationDialog,
        BulkInvoiceNegotiationConfirmationDialog,
    ],
    entryComponents: [
        PayerInvoiceBulkNegotiationDialog,
        BulkInvoiceNegotiationConfirmationDialog,
    ],
    exports: [PayerInvoiceBulkNegotiationDialog],
})
export class PayerInvoiceBulkNegotiationDialogModule {}
