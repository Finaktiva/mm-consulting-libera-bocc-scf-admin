import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CircleChipModule, StatusChipModule } from '@libera/shared';

import { TranslateModule } from '@ngx-translate/core';
import { CreateRoleDialogModule } from '../../dialogs/create-role-dialog/create-role.dialog.module';
import { RoleTableComponent } from './role-table.component';

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
    MatProgressBarModule,
    CreateRoleDialogModule,
];

const COMMON_DECLARATIONS = [RoleTableComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class RoleTableModule {}
