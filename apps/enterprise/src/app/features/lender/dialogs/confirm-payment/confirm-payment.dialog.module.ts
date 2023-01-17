import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ConfirmPaymentFormModule } from '../../components/confirm-payment-form/confirm-payment-form.module';
import { PaymentInfoModule } from '../../components/payment-info/payment-info.module';
import { ConfirmPaymentDialog } from './confirm-payment.dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressBarModule,
        PaymentInfoModule,
        ConfirmPaymentFormModule,
        TranslateModule
    ],
    declarations: [ConfirmPaymentDialog],
    entryComponents: [ConfirmPaymentDialog],
    exports: [ConfirmPaymentDialog],
})
export class ConfirmPaymentDialogModule { }
