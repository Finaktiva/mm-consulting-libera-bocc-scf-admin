import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { StatusChipModule } from '@libera/shared';

import { LenderQuotaRequestFormModule } from '../lender-quota-request-form/lender-quota-request-form.module';
import { LenderQuotaRequestTableComponent } from './lender-quota-request-table.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatTableModule,
        MatDividerModule,
        StatusChipModule,
        LenderQuotaRequestFormModule,
        TranslateModule
    ],
    declarations: [LenderQuotaRequestTableComponent],
    exports: [LenderQuotaRequestTableComponent],
})
export class LenderQuotaRequestTableModule { }
