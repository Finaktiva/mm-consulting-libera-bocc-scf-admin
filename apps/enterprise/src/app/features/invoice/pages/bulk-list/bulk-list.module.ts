import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@libera/shared';

import { BulkInvoiceTableModule } from '../../components/bulk-invoice-table/bulk-invoice-table.module';
import { BulkListPage } from './bulk-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatProgressBarModule,
        MatPaginatorModule,
        AlertModule,
        BulkInvoiceTableModule,
        TranslateModule
    ],
    declarations: [BulkListPage],
    exports: [BulkListPage],
})
export class BulkListPageModule { }
