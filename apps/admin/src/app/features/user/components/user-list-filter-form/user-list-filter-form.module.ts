import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { UserListFilterFormComponent } from './user-list-filter-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule
];

const COMMON_DECLARATIONS = [UserListFilterFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class UserListFilterFormModule {}
