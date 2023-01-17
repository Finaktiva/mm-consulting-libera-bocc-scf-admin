import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgEzFileModule } from '@ngez/core';

import { DocumentationCardComponent } from './documentation-card.component';
import { DocumentationDropzoneComponent } from './documentation-dropzone.component';
import { DocumentationListItemComponent } from './documentation-list-item.component';
import { DocumentationListComponent } from './documentation-list.component';
import { TranslateModule } from '@ngx-translate/core';

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
];

const COMMON_DECLARATIONS = [
    DocumentationListComponent,
    DocumentationListItemComponent,
    DocumentationDropzoneComponent,
    DocumentationCardComponent,
];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [DocumentationListComponent],
})
export class DocumentationListModule {}
