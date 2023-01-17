import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgEzFileModule } from '@ngez/core';

import { DocumentationCardComponent } from './documentation-card.component';
import { DocumentationDropzoneComponent } from './documentation-dropzone.component';
import { DocumentationDialog } from './documentation.dialog';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    NgEzFileModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [
    DocumentationDialog,
    DocumentationDropzoneComponent,
    DocumentationCardComponent,
];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    entryComponents: [DocumentationDialog],
    exports: [DocumentationDialog],
})
export class DocumentationDialogModule { }
