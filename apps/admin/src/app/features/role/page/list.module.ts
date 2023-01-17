import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { TranslateModule } from '@ngx-translate/core';
import { RoleListFilterFormModule } from '../components/role-list-filter-form/role-list-filter-form.module';
import { CreateRoleDialogModule } from '../dialogs/create-role-dialog/create-role.dialog.module';
import { RoleTableModule } from '../components/role-table/role-table.module';
import { EnabledRoleDialogModule } from '../dialogs/enabled-role/enabled-role.dialog.module';
import { RoleListPage } from './list.page';
import { AlertModule } from '@libera/shared';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatDialogModule,
    TranslateModule,
    RoleTableModule,
    RoleListFilterFormModule,
    EnabledRoleDialogModule,
    CreateRoleDialogModule,
    AlertModule,
];

const COMMON_DECLARATIONS = [RoleListPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class RoleListModule {}
