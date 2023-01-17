import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DocumentationTableModule } from '../../components/documentation-table/documentation-table.module';

import { DocumentationListModule } from '../../components/documentation-list/documentation-list.module';
import { UploadDocumentationPage } from './upload-documentation.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddDocumentDialogModule } from '../../dialogs/add-document/add-document-dialog-module';
import { EnterpriseDocumentationTableModule, EnterpriseFormModule, StatusChipModule } from '@libera/shared';
import { MatIconModule, MatProgressBarModule, MatTooltipModule } from '@angular/material';
import { NgEzFileModule } from '@ngez/core';
import { SendDocumentationDialogModule } from '../../dialogs/send-documentation-dialog/send-documentation.dialog.module';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatCheckboxModule,
    DocumentationListModule,
    TranslateModule,
    DocumentationTableModule,
    AddDocumentDialogModule,
    EnterpriseDocumentationTableModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    NgEzFileModule,
    StatusChipModule,
    EnterpriseFormModule,
    SendDocumentationDialogModule,
];

const COMMON_DECLARATIONS = [UploadDocumentationPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class UploadDocumentationModule {}
