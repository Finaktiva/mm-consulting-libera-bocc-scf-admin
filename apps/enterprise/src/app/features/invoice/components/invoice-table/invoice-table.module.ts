import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { StatusChipModule } from '@libera/shared';

import { InvoiceTableComponent } from './invoice-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        StatusChipModule,
        TranslateModule,
        MatCheckboxModule,
    ],
    declarations: [InvoiceTableComponent],
    exports: [InvoiceTableComponent],
})
export class InvoiceTableModule {}
