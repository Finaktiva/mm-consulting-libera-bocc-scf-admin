import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRequestFormComponent } from './payment-request-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencySymbolPipeModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
  CommonModule,
  FlexLayoutModule,
  MatInputModule,
  MatDatepickerModule,
  ReactiveFormsModule,
  CurrencySymbolPipeModule,
  TranslateModule
];

const COMMON_DECLARATIONS = [PaymentRequestFormComponent]


@NgModule({
  imports: [COMMON_IMPORTS],
  declarations: [COMMON_DECLARATIONS],
  exports: [COMMON_DECLARATIONS],
})
export class PaymentRequestFormModule { }
