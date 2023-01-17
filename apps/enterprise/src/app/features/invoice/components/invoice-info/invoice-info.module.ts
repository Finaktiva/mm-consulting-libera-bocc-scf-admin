import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';

import { InvoiceInfoComponent } from './invoice-info.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatListModule, TranslateModule],
    declarations: [InvoiceInfoComponent],
    exports: [InvoiceInfoComponent],
})
export class InvoiceInfoModule {}
