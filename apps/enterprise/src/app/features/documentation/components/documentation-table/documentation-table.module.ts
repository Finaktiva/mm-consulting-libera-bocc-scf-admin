import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgEzFileModule } from '@ngez/core';
import { EnterpriseDocumentationTableModule, EnterpriseFormModule, StatusChipModule } from '@libera/shared';

import { DocumentationTableComponent } from './documentation-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddDocumentDialogModule
 } from '../../../my-enterprise/dialogs/add-document/add-document-dialog-module';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    NgEzFileModule,
    TranslateModule,
    EnterpriseDocumentationTableModule,
    StatusChipModule,
    EnterpriseFormModule,
    MatProgressSpinnerModule,
    AddDocumentDialogModule,
];

const COMMON_DECLARATIONS = [
    DocumentationTableComponent,
];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [DocumentationTableComponent],
})
export class DocumentationTableModule {}
