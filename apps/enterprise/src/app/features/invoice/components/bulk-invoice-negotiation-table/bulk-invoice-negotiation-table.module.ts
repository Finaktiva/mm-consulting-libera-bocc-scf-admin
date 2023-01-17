import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { StatusChipModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';

import { BulkInvoiceNegotiationTableComponent } from './bulk-invoice-negotiation-table.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        StatusChipModule,
        TranslateModule,
    ],
    declarations: [BulkInvoiceNegotiationTableComponent],
    exports: [BulkInvoiceNegotiationTableComponent],
})
export class BulkInvoiceNegotiationTableModule {}
