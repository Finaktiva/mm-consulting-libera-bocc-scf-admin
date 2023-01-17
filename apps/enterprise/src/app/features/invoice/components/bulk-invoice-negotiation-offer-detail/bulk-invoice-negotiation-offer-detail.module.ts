import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { DividePipeModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';

import { BulkInvoiceNegotiationOfferDetailComponent } from './bulk-invoice-negotiation-offer-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatDividerModule,
        TranslateModule,
        DividePipeModule,
    ],
    declarations: [BulkInvoiceNegotiationOfferDetailComponent],
    exports: [BulkInvoiceNegotiationOfferDetailComponent],
})
export class BulkInvoiceNegotiationOfferDetailModule {}
