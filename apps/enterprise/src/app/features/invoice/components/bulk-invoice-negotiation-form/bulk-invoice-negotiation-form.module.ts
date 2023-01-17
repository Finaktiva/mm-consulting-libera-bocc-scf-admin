import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlertModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';

import { BulkInvoiceNegotiationFormComponent } from './bulk-invoice-negotiation-form.component';
import { InvoicePickerComponent } from './invoice-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatTableModule,
        MatCheckboxModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTooltipModule,
        MatDividerModule,
        TranslateModule,
        AlertModule,
    ],
    declarations: [BulkInvoiceNegotiationFormComponent, InvoicePickerComponent],
    exports: [BulkInvoiceNegotiationFormComponent],
})
export class BulkInvoiceNegotiationFormModule {}
