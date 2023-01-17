import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ModuleTableComponent } from './module-table.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    MatTableModule,
    MatTooltipModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [ModuleTableComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ModuleTableModule { }
