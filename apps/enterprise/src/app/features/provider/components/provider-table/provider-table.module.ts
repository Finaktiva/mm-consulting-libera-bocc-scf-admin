import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { StatusChipModule } from '@libera/shared';

import { ProviderTableComponent } from './provider-table.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [MatTableModule, CommonModule, StatusChipModule, TranslateModule];

const COMMON_DECLARATIONS = [ProviderTableComponent];

@NgModule({
    imports: [COMMON_IMPORTS, TranslateModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ProviderTableModule { }
