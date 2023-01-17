import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ProviderInvoiceListFilterFormComponent } from './provider-invoice-list-filter-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatSelectModule,
        TranslateModule
    ],
    declarations: [ProviderInvoiceListFilterFormComponent],
    exports: [ProviderInvoiceListFilterFormComponent],
})
export class ProviderInvoiceListFilterFormModule { }
