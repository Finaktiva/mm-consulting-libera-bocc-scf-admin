import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PaymentInfoComponent } from './payment-info.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [FlexLayoutModule, CommonModule, TranslateModule],
    declarations: [PaymentInfoComponent],
    exports: [PaymentInfoComponent],
})
export class PaymentInfoModule { }
