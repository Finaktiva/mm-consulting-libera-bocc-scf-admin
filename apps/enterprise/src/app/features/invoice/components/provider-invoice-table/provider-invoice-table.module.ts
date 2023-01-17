import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DividePipeModule, StatusChipModule } from '@libera/shared';

import { ProviderInvoiceTableComponent } from './provider-invoice-table.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        StatusChipModule,
        DividePipeModule,
        TranslateModule
    ],
    declarations: [ProviderInvoiceTableComponent],
    exports: [ProviderInvoiceTableComponent],
})
export class ProviderInvoiceTableModule { }
