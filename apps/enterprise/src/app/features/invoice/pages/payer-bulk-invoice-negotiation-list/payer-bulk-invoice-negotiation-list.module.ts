import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';

import {
    BulkInvoiceNegotiationListFilterFormModule,
} from '../../components/bulk-invoice-negotiation-list-filter-form/bulk-invoice-negotiation-list-filter-form.module';
import {
    BulkInvoiceNegotiationTableModule,
} from '../../components/bulk-invoice-negotiation-table/bulk-invoice-negotiation-table.module';
import { PayerBulkInvoiceNegotiationListPage } from './payer-bulk-invoice-negotiation-list.page';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatPaginatorModule,
        TranslateModule,
        AlertModule,
        BulkInvoiceNegotiationTableModule,
        BulkInvoiceNegotiationListFilterFormModule,
    ],
    declarations: [PayerBulkInvoiceNegotiationListPage],
    exports: [PayerBulkInvoiceNegotiationListPage],
})
export class PayerBulkInvoiceNegotiationListPageModule {}
