import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CircleChipModule, StatusChipModule } from '@libera/shared';

import { RequestModuleTableComponent } from './request-module-table.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    MatTableModule,
    MatTooltipModule,
    CommonModule,
    StatusChipModule,
    CircleChipModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [RequestModuleTableComponent];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class RequestModuleTableModule {}
