import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgEzFileModule } from '@ngez/core';
import { NgxFileDropzoneModule } from 'ngx-file-dropzone';

import { ConfirmPaymentFormComponent } from './confirm-payment-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatInputModule,
        MatDatepickerModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        NgxFileDropzoneModule,
        NgEzFileModule,
        TranslateModule
    ],
    declarations: [ConfirmPaymentFormComponent],
    exports: [ConfirmPaymentFormComponent],
})
export class ConfirmPaymentFormModule { }
