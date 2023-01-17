import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedListComponent } from './linked-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertModule } from '@libera/shared';
import { LinkedLenderTableModule } from '../../components/linked-lender-table/linked-lender-table.module';
import { LenderListPaginationFilterFormModule } from '../../components/lender-list-pagination-filter-form/lender-list-pagination-filter-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateQuotaDialogModule } from '../../dialogs/update-quota-dialog/update-quota-dialog.module';
import { RequestQuotaExpansionDialogModule } from '../../dialogs/request-quota-expansion-dialog/request-quota-expansion-dialog.module';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatProgressBarModule,
    AlertModule,
    LinkedLenderTableModule,
    LenderListPaginationFilterFormModule,
    MatDialogModule,
    UpdateQuotaDialogModule,
    RequestQuotaExpansionDialogModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [LinkedListComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_MODULES,
    exports: COMMON_DECLARATIONS,
})
export class LinkedListModule {}
