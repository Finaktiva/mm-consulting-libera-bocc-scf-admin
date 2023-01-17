import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgEzFileModule } from '@ngez/core';
import { NgxFileDropzoneModule } from 'ngx-file-dropzone';

import { ProviderBulkFormComponent } from './provider-bulk-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ScrollDispatchModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatStepperModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        NgxFileDropzoneModule,
        NgEzFileModule,
        TranslateModule
    ],
    declarations: [ProviderBulkFormComponent],
    exports: [ProviderBulkFormComponent],
})
export class ProviderBulkFormModule { }
