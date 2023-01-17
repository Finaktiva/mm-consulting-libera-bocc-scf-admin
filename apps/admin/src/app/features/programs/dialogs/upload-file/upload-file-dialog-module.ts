import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { UploadFileDialog } from './upload-file-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { NgEzFileModule } from '@ngez/core';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatAutocompleteModule,
    FormsModule,
    NgEzFileModule,
];

const COMMON_DECLARATIONS = [UploadFileDialog];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_IMPORTS,
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS,
})
export class UploadFileDialogModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };