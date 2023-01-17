import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PaymentInfoModule } from '../../components/payment-info/payment-info.module';
import { RejectPaymentDialog } from './reject-payment.dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressBarModule,
        MatInputModule,
        PaymentInfoModule,
        TranslateModule
    ],
    declarations: [RejectPaymentDialog],
    entryComponents: [RejectPaymentDialog],
    exports: [RejectPaymentDialog],
})
export class RejectPaymentDialogModule { }
