import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@libera/shared';

import { ProviderInvoiceListFilterFormModule } from '../../components/provider-invoice-list-filter-form/provider-invoice-list-filter-form.module';
import { ProviderInvoiceTableModule } from '../../components/provider-invoice-table/provider-invoice-table.module';
import { ProviderInvoiceListPage } from './provider-invoice-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatPaginatorModule,
        AlertModule,
        ProviderInvoiceTableModule,
        ProviderInvoiceListFilterFormModule,
        TranslateModule,
        MatButtonModule,
    ],
    declarations: [ProviderInvoiceListPage],
    exports: [ProviderInvoiceListPage],
})
export class ProviderInvoiceListModule {}
