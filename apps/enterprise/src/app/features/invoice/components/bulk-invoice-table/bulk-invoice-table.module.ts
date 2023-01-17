import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusChipModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';
import { BulkInvoiceTableComponent } from './bulk-invoice-table.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        StatusChipModule,
        TranslateModule,
    ],
    declarations: [BulkInvoiceTableComponent],
    exports: [BulkInvoiceTableComponent],
})
export class BulkInvoiceTableModule {}
