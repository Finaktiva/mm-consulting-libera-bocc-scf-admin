import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { InvoiceRequestInfoComponent } from './invoice-request-info.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [FlexLayoutModule, CommonModule, TranslateModule],
    declarations: [InvoiceRequestInfoComponent],
    exports: [InvoiceRequestInfoComponent],
})
export class InvoiceRequestInfoModule { }
