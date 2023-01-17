import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { StatusChipModule } from '@libera/shared';

import { InvoiceRequestTableComponent } from './invoice-request-table.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, RouterModule, MatTableModule, StatusChipModule, TranslateModule],
    declarations: [InvoiceRequestTableComponent],
    exports: [InvoiceRequestTableComponent],
})
export class InvoiceRequestTableModule { }
