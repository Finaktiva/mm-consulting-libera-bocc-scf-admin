import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@libera/shared';

import {
    InvoiceRequestListFilterFormModule,
} from '../../components/invoice-request-list-filter-form/invoice-request-list-filter-form.module';
import { InvoiceRequestTableModule } from '../../components/invoice-request-table/invoice-request-table.module';
import { RequestListPage } from './request-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatPaginatorModule,
        InvoiceRequestTableModule,
        InvoiceRequestListFilterFormModule,
        AlertModule,
        TranslateModule
    ],
    declarations: [RequestListPage],
    exports: [RequestListPage],
})
export class RequestListPageModule { }
