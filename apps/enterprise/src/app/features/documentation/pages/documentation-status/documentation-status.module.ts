import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EnterpriseDocumentationTableModule } from '@libera/shared';

import { DocumentationStatusPage } from './documentation-status.page';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    EnterpriseDocumentationTableModule,
    CommonModule,
    MatProgressSpinnerModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [DocumentationStatusPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class DocumentationStatusModule {}
