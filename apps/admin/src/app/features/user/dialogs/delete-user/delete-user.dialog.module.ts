import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { DeleteUserDialog } from './delete-user.dialog';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [DeleteUserDialog];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    entryComponents: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class DeleteUserDialogModule {}
