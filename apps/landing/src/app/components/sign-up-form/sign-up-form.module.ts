import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { SignUpFormComponent } from './sign-up-form.component';

const COMMON_IMPORTS = [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
];

const COMMON_DECLARATIONS = [SignUpFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class SignUpFormModule {}

export default { COMMON_IMPORTS, COMMON_DECLARATIONS };
