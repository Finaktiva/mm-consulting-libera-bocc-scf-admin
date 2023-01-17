import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AlertModule, StatusChipModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';

import {
    BulkInvoiceNegotiationOfferDetailModule,
} from '../../components/bulk-invoice-negotiation-offer-detail/bulk-invoice-negotiation-offer-detail.module';
import { InvoiceListModule } from '../../components/invoice-list/invoice-list.module';
import {
    BulkInvoiceNegotiationAcceptOfferDialogModule,
} from '../../dialogs/bulk-invoice-negotiation-accept-offer/bulk-invoice-negotiation-accept-offer.dialog.module';
import {
    BulkInvoiceNegotiationRejectOfferDialogModule,
} from '../../dialogs/bulk-invoice-negotiation-reject-offer/bulk-invoice-negotiation-reject-offer.dialog.module';
import {
    ProviderBulkInvoiceNegotiationCounterOfferDialogModule,
} from '../../dialogs/provider-bulk-invoice-negotiation-counter-offer/provider-bulk-invoice-negotiation-counter-offer.dialog.module';
import { ProviderBulkInvoiceNegotiationDetailPage } from './provider-bulk-invoice-negotiation-detail.page';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        TranslateModule,
        AlertModule,
        StatusChipModule,
        BulkInvoiceNegotiationOfferDetailModule,
        InvoiceListModule,
        ProviderBulkInvoiceNegotiationCounterOfferDialogModule,
        BulkInvoiceNegotiationAcceptOfferDialogModule,
        BulkInvoiceNegotiationRejectOfferDialogModule,
    ],
    declarations: [ProviderBulkInvoiceNegotiationDetailPage],
    exports: [ProviderBulkInvoiceNegotiationDetailPage],
})
export class ProviderBulkInvoiceNegotiationDetailPageModule {}
