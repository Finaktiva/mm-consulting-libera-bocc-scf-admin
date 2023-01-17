import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRequestDialog } from './payment-request.dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { PaymentRequestFormModule } from '../../components/payment-request-form/payment-request-form.module';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
  CommonModule,
  FlexLayoutModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  PaymentRequestFormModule,
  TranslateModule
];

const COMMON_DECLARATIONS = [PaymentRequestDialog]


@NgModule({
  imports: [COMMON_IMPORTS],
  declarations: [COMMON_DECLARATIONS],
  exports: [COMMON_DECLARATIONS],
  entryComponents: [COMMON_DECLARATIONS]
})
export class PaymentRequestDialogModule { }
