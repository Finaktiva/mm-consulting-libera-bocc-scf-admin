import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { StatusChipModule } from '@libera/shared';

import { ProviderBulkTableComponent } from './provider-bulk-table.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, MatTableModule, StatusChipModule, TranslateModule],
    declarations: [ProviderBulkTableComponent],
    exports: [ProviderBulkTableComponent],
})
export class ProviderBulkTableModule { }
