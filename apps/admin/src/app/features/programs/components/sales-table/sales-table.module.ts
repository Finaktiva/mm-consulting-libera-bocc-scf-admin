import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CircleChipModule, SalesPipeModule, StatusChipModule } from '@libera/shared';

import { SalesTableComponent } from './sales-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    CircleChipModule,
    StatusChipModule,
    MatTableModule,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    MatDialogModule,
    SalesPipeModule,
];

const COMMON_DECLARATIONS = [SalesTableComponent];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
    entryComponents: COMMON_DECLARATIONS,
})
export class SalesTableModule {}
