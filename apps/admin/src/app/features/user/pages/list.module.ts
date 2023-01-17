import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { UserListFilterFormModule } from '../components/user-list-filter-form/user-list-filter-form.module';
import { UserTableModule } from '../components/user-table/user-table.module';
import { CreateUserDialogModule } from '../dialogs/create-user/create-user.dialog.module';
import { DeleteUserDialogModule } from '../dialogs/delete-user/delete-user.dialog.module';
import { UpdateUserDialogModule } from '../dialogs/update-user/update-user.dialog.module';
import { UserListPage } from './list.page';
import { TranslateModule } from '@ngx-translate/core';
import { AlertModule } from '@libera/shared';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    UserTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    UserListFilterFormModule,
    MatDialogModule,
    CreateUserDialogModule,
    UpdateUserDialogModule,
    DeleteUserDialogModule,
    TranslateModule,
    AlertModule,
];

const COMMON_DECLARATIONS = [UserListPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class UserListModule {}
