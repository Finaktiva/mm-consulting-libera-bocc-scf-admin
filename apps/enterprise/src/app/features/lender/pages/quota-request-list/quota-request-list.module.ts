import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertModule } from '@libera/shared';

import { LenderQuotaRequestListPaginationFilterFormModule } from '../../components/lender-quota-request-list-pagination-filter-form/lender-quota-request-list-pagination-filter-form.module';
import { LenderQuotaRequestTableModule } from '../../components/lender-quota-request-table/lender-quota-request-table.module';
import { RejectQuotaRequestDialogModule } from '../../dialogs/reject-quota-request/reject-quota-request.dialog.module';
import { UpdateQuotaRequestDialogModule } from '../../dialogs/update-quota-request/update-quota-request.dialog.module';
import { QuotaRequestListPage } from './quota-request-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { AssignQuotaRequestDialogModule } from '../../dialogs/assign-quota-request/assign-quota-request.dialog.module';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatPaginatorModule,
        LenderQuotaRequestTableModule,
        LenderQuotaRequestListPaginationFilterFormModule,
        AlertModule,
        UpdateQuotaRequestDialogModule,
        AssignQuotaRequestDialogModule,
        RejectQuotaRequestDialogModule,
        TranslateModule,
    ],
    declarations: [QuotaRequestListPage],
    exports: [QuotaRequestListPage],
})
export class QuotaRequestListPageModule {}
