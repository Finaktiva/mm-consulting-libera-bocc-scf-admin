import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';

import { InvoiceListFilterFormModule } from '../../components/invoice-list-filter-form/invoice-list-filter-form.module';
import { InvoiceTableModule } from '../../components/invoice-table/invoice-table.module';
import { invoiceConfirmDeleteDialogModule } from '../../dialogs/invoice-confirm-delete/invoice-confirm-delete.dialog.module';
import {
    PayerInvoiceBulkNegotiationDialogModule,
} from '../../dialogs/payer-invoice-bulk-negotiation/payer-invoice-bulk-negotiation.dialog.module';
import { InvoiceListPage } from './invoice-list.page';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressBarModule,
        MatPaginatorModule,
        AlertModule,
        InvoiceTableModule,
        InvoiceListFilterFormModule,
        invoiceConfirmDeleteDialogModule,
        TranslateModule,
        MatIconModule,
        PayerInvoiceBulkNegotiationDialogModule,
    ],
    declarations: [InvoiceListPage],
    exports: [InvoiceListPage],
})
export class InvoiceListModule {}
