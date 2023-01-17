import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleFormComponent } from './role-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule, MatIconModule, MatSnackBar, MatSnackBarModule, MatTooltipModule, MatTreeModule } from '@angular/material';
import { CreateRoleDialogModule } from '../../dialogs/create-role-dialog/create-role.dialog.module';
import { ConfirmRoleDialogModule } from '../../dialogs/confirm-role-dialog/confirm-role.dialog.module';

const COMMON_IMPORTS = [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatTooltipModule,
    TranslateModule,
    MatAutocompleteModule,
    FormsModule,
    MatSnackBarModule,
    MatTreeModule,
    MatSnackBarModule,
    ConfirmRoleDialogModule,
];

const COMMON_DECLARATIONS = [RoleFormComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: [COMMON_IMPORTS],
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS
})
export class RoleFormModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
