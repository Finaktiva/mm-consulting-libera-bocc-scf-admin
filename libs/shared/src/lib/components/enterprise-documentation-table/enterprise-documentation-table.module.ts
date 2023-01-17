import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgEzFileModule } from '@ngez/core';
import { TranslateModule } from '@ngx-translate/core';
import { StatusChipModule } from '../status-chip/status-chip.module';
import { EnterpriseDocumentationTableActionsComponent } from './enterprise-documentation-table-actions.component';
import { EnterpriseDocumentationTableComponent } from './enterprise-documentation-table.component';

import { ApproveDialogModule } from '../../dialogs/approve-document/approve-document-dialog-module'
import { UploadFileDialogModule } from '../../dialogs/upload-file/upload-file-dialog-module'
import { DeleteDocumentDialogModule } from '../../dialogs/delete-document/delete-document-dialog-module'

import { MatAutocompleteModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';


const COMMON_IMPORTS = [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    FlexLayoutModule,
    NgEzFileModule,
    StatusChipModule,
    TranslateModule,
    ApproveDialogModule,
    DeleteDocumentDialogModule,
    UploadFileDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    FormsModule
];

const COMMON_DECLARATIONS = [
    EnterpriseDocumentationTableComponent,
    EnterpriseDocumentationTableActionsComponent,
];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: [COMMON_IMPORTS],
    exports: [COMMON_DECLARATIONS],
})
export class EnterpriseDocumentationTableModule { }

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
