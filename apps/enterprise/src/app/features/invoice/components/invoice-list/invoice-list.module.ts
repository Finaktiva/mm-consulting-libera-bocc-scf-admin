import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';

import { InvoiceListComponent } from './invoice-list.component';

@NgModule({
    imports: [CommonModule, MatTableModule, TranslateModule],
    declarations: [InvoiceListComponent],
    exports: [InvoiceListComponent],
})
export class InvoiceListModule {}
