import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { UserListFilterFormComponent } from './user-list-filter-form.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [UserListFilterFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class UserListFilterFormModule { }
