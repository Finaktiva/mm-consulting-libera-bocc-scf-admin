import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EnterpriseDocumentationTableModule } from '@libera/shared';

import { DocumentationPage } from './documentation.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material';
import { AddDocumentDialogModule } from '../../dialogs/add-document/add-document-dialog-module';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatProgressBarModule,
    EnterpriseDocumentationTableModule,
    TranslateModule,
    MatButtonModule,
    AddDocumentDialogModule
];

const COMMON_DECLARATIONS = [DocumentationPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class DocumentationModule { }
