import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertModule } from '@libera/shared';

import {
    LenderListPaginationFilterFormModule,
} from '../../components/lender-list-pagination-filter-form/lender-list-pagination-filter-form.module';
import { LenderTableModule } from '../../components/lender-table/lender-table.module';
import { LenderListPage } from './list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatPaginatorModule,
        LenderTableModule,
        LenderListPaginationFilterFormModule,
        AlertModule,
        TranslateModule
    ],
    declarations: [LenderListPage],
    exports: [LenderListPage],
})
export class LenderListPageModule { }
