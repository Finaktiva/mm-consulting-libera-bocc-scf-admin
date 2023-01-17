import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { StatusChipModule } from '@libera/shared';

import { RequestLinkTableComponent } from './request-link-table.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    MatTableModule,
    MatTooltipModule,
    CommonModule,
    StatusChipModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [RequestLinkTableComponent];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class RequestLinkTableModule {}
