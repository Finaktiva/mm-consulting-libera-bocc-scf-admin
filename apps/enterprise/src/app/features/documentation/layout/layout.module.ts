import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { DocumentationLayout } from './documentation.layout';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [DocumentationLayout];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class DocumentationLayoutModule {}
