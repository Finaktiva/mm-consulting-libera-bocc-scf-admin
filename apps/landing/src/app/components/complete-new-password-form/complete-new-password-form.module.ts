import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteNewPasswordFormComponent } from './complete-new-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

const COMMON_IMPORTS = [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
];
const COMMON_DECLARATIONS = [CompleteNewPasswordFormComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: [COMMON_IMPORTS],
    exports: COMMON_DECLARATIONS,
})
export class CompleteNewPasswordFormModule {}

export default { COMMON_IMPORTS, COMMON_DECLARATIONS };
