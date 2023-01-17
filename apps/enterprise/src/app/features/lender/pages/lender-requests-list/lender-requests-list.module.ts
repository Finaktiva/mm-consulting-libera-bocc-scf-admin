import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertModule, ListFiltersModule } from '@libera/shared';
import { LenderRequestsTableModule } from '../../components/lender-requests-table/lender-requests-table.module';
import { ApproveAssignedQuotaRequestModule } from '../../dialogs/approve-assigned-quota-request/approve-assigned-quota-request.module';
import { LenderRequestsListComponent } from './lender-requests-list.component';
import { RejectAssignedQuotaRequestModule } from '../../dialogs/reject-assigned-quota-request/reject-assigned-quota-request.module';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatProgressBarModule,
    AlertModule,
    MatButtonModule,
    LenderRequestsTableModule,
    ListFiltersModule,
    ApproveAssignedQuotaRequestModule,
    RejectAssignedQuotaRequestModule,
    MatDialogModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [LenderRequestsListComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_MODULES,
    exports: COMMON_DECLARATIONS,
})
export class LenderRequestsListModule {}
