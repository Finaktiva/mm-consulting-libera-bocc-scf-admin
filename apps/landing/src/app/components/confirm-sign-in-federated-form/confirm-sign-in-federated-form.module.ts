import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmSignInFederatedFormComponent } from './confirm-sign-in-federated-form.component';

const COMMON_IMPORTS = [
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [ConfirmSignInFederatedFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ConfirmSignInFederatedFormModule {}
