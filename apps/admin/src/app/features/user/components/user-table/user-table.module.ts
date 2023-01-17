import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CircleChipModule, StatusChipModule } from '@libera/shared';

import { UserTableComponent } from './user-table.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSlideToggleModule,
    CircleChipModule,
    StatusChipModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [UserTableComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class UserTableModule {}
