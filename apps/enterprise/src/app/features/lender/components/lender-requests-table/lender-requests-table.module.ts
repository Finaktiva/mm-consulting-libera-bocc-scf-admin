import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { CurrencySymbolPipeModule, StatusChipModule } from '@libera/shared';
import { LenderRequestsTableComponent } from './lender-requests-table.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    MatTableModule,
    StatusChipModule,
    MatDividerModule,
    FlexLayoutModule,
    CurrencySymbolPipeModule,
    MatButtonModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [LenderRequestsTableComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_MODULES,
    exports: COMMON_DECLARATIONS,
})
export class LenderRequestsTableModule { }
