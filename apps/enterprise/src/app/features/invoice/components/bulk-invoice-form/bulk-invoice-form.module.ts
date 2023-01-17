import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgEzFileModule } from '@ngez/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxFileDropzoneModule } from 'ngx-file-dropzone';
import { CustomAttributePickerDialogModule } from '../../dialogs/custom-attribute-picker/custom-attribute-picker.dialog.module';
import { BulkInvoiceFormComponent } from './bulk-invoice-form.component';

@NgModule({
    imports: [
        ScrollDispatchModule,
        CommonModule,
        FlexLayoutModule,
        MatStepperModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        NgxFileDropzoneModule,
        MatDividerModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatStepperModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        NgEzFileModule,
        CustomAttributePickerDialogModule,
        TranslateModule,
    ],
    declarations: [BulkInvoiceFormComponent],
    exports: [BulkInvoiceFormComponent],
})
export class BulkInvoiceFormModule {}
