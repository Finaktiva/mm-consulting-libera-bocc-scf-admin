import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmSignUpFormComponent } from './confirm-sign-up-form.component';
import { ContactInfoDialogModule } from '../../dialogs/contact-info/contact-info.dialog.module';

const COMMON_IMPORTS = [
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ContactInfoDialogModule,
];

const COMMON_DECLARATIONS = [ConfirmSignUpFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ConfirmSignUpFormModule {}
