import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { RoleListFilterFormComponent } from './role-list-filter-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
];

const COMMON_DECLARATIONS = [RoleListFilterFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class RoleListFilterFormModule {}
