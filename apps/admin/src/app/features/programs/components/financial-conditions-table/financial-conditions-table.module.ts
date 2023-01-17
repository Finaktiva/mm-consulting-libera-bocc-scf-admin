import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CircleChipModule, StatusChipModule } from '@libera/shared';

import { FinancialConditionsTableComponent } from './financial-conditions-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { DetailFinancialConditionsDialogModule } from '../../dialogs/detail-financial-conditions-dialog/detail-financial-conditions.dialog.module';

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
    DetailFinancialConditionsDialogModule,
];

const COMMON_DECLARATIONS = [FinancialConditionsTableComponent];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class FinancialConditionsTableModule {}
