import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencySymbolPipeModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAttributePickerDialogModule } from '../../dialogs/custom-attribute-picker/custom-attribute-picker.dialog.module';
import { InvoiceFormComponent } from './invoice-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatButtonModule,
        MatDividerModule,
        MatAutocompleteModule,
        MatDialogModule,
        CustomAttributePickerDialogModule,
        CurrencySymbolPipeModule,
        TranslateModule,
    ],
    declarations: [InvoiceFormComponent],
    exports: [InvoiceFormComponent],
})
export class InvoiceFormModule {}
