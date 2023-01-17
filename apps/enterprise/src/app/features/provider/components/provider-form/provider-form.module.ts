import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProviderFormComponent } from './provider-form.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatProgressBarModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { NgxFileDropzoneModule } from 'ngx-file-dropzone';
import { NgEzFileModule } from '@ngez/core';
import { StatusChipModule } from '@libera/shared';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    TranslateModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    NgxFileDropzoneModule,
    NgEzFileModule,
    MatTableModule,
    MatChipsModule,
    StatusChipModule,
    MatSnackBarModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [ProviderFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ProviderFormModule { }
