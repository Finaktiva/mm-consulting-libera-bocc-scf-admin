import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ForgotPasswordSubmitFormComponent } from './forgot-password-submit-form.component';

const COMMON_IMPORTS = [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
];

const COMMON_DECLARATIONS = [ForgotPasswordSubmitFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ForgotPasswordSubmitFormModule {}

export default { COMMON_IMPORTS, COMMON_DECLARATIONS };
