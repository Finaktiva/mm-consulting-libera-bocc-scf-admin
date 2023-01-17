import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

import { ProviderBulkTableModule } from '../../components/provider-bulk-table/provider-bulk-table.module';
import { ProviderBulkListPage } from './bulk-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatButtonModule,
        MatProgressBarModule,
        MatPaginatorModule,
        ProviderBulkTableModule,
        TranslateModule
    ],
    declarations: [ProviderBulkListPage],
    exports: [ProviderBulkListPage],
})
export class ProviderBulkListModule { }
