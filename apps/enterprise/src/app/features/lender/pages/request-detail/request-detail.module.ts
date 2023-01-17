import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AlertModule, StatusChipModule } from '@libera/shared';

import { InvoiceRequestInfoModule } from '../../components/invoice-request-info/invoice-request-info.module';
import { ConfirmPaymentDialogModule } from '../../dialogs/confirm-payment/confirm-payment.dialog.module';
import { RejectPaymentDialogModule } from '../../dialogs/reject-payment/reject-payment.dialog.module';
import { RequestDetailPage } from './request-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FlexLayoutModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        InvoiceRequestInfoModule,
        RejectPaymentDialogModule,
        ConfirmPaymentDialogModule,
        StatusChipModule,
        AlertModule,
        TranslateModule,
    ],
    declarations: [RequestDetailPage],
    exports: [RequestDetailPage],
})
export class RequestDetailPageModule {}
