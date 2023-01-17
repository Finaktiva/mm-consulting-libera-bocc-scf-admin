import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { UserFormComponent } from './user-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatProgressBarModule, MatTooltipModule } from '@angular/material';

const COMMON_IMPORTS = [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
];

const COMMON_DECLARATIONS = [UserFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class UserFormModule {}
