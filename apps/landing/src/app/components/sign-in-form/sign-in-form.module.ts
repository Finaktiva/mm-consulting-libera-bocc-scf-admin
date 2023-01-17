import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { SignInFormComponent } from './sign-in-form.component';

const COMMON_IMPORTS = [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
];

const COMMON_DECLARATIONS = [SignInFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
})
export class SignInFormModule {}

export default { COMMON_IMPORTS, COMMON_DECLARATIONS };
