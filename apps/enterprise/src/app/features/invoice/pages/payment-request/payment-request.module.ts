import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRequestPage } from './payment-request.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PaymentRequestInfoComponent } from '../../components/payment-request-info/payment-request-info.component';
import { PaymentRequestInfoModule } from '../../components/payment-request-info/payment-request-info.module';
import { AlertModule } from '@libera/shared';
import { PaymentRequestDialogModule } from '../../dialogs/payment-request/payment-request.dialog.module';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
  CommonModule,
  FlexLayoutModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  AlertModule,
  PaymentRequestInfoModule,
  PaymentRequestDialogModule,
  TranslateModule,
];

const COMMON_DECLARATIONS = [PaymentRequestPage]


@NgModule({
  imports: [COMMON_IMPORTS],
  declarations: [COMMON_DECLARATIONS],
  exports: [COMMON_DECLARATIONS]
})
export class PaymentRequestPageModule { }
