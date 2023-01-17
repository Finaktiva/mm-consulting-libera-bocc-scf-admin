import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRequestInfoComponent } from './payment-request-info.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
  CommonModule,
  FlexLayoutModule,
  MatIconModule,
  TranslateModule
];

const COMMON_DECLARATIONS = [PaymentRequestInfoComponent]

@NgModule({
  imports: [COMMON_IMPORTS],
  declarations: [COMMON_DECLARATIONS],
  exports: [COMMON_DECLARATIONS]
})
export class PaymentRequestInfoModule { }
