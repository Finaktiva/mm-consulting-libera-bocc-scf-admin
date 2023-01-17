import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

import { BulkInvoiceNegotiationListFilterFormComponent } from './bulk-invoice-negotiation-list-filter-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        TranslateModule,
    ],
    declarations: [BulkInvoiceNegotiationListFilterFormComponent],
    exports: [BulkInvoiceNegotiationListFilterFormComponent],
})
export class BulkInvoiceNegotiationListFilterFormModule {}
