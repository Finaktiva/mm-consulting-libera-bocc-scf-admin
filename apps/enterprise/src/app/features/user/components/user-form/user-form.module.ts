import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { UserFormComponent } from './user-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatTooltipModule } from '@angular/material';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
];

const COMMON_DECLARATIONS = [UserFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class UserFormModule { }
