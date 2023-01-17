import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { ExplanationFormComponent } from './explanation-form.component';
import { ReuploadFileDialog } from './reupload-file.dialog';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [ReuploadFileDialog, ExplanationFormComponent];

@NgModule({
    declarations: [COMMON_DECLARATIONS],
    imports: [COMMON_IMPORTS],
    exports: [ReuploadFileDialog],
    entryComponents: [ReuploadFileDialog],
})
export class ReuploadFileDialogModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
