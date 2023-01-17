import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CreateRoleDialog } from './create-role.dialog';
import { TranslateModule } from '@ngx-translate/core';
import { RoleFormModule } from '../../components/role-form/role-form.module';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    RoleFormModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [CreateRoleDialog];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_IMPORTS,
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS,
})
export class CreateRoleDialogModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
