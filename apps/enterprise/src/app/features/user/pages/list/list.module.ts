import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

import { UserListFilterFormModule } from '../../components/user-list-filter-form/user-list-filter-form.module';
import { UserTableModule } from '../../components/user-table/user-table.module';
import { CreateUserDialogModule } from '../../dialogs/create-user/create-user.dialog.module';
import { UserListPage } from './list.page';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    UserTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    CommonModule,
    RouterModule,
    UserListFilterFormModule,
    MatButtonModule,
    CreateUserDialogModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [UserListPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class UserListModule { }
