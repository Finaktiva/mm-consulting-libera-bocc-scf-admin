import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EnterpriseDocumentationTableModule, EnterpriseFormModule, StatusChipModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';
import { EnterpriseInfoModule } from 'apps/admin/src/app/components/enterprise-info/enterprise-info.module';
import { ReuploadFileDialogModule } from 'apps/admin/src/app/dialogs/reupload-file/reupload-file.dialog.module';
import { ActivitiesHistoryModule } from '../../components/activities-history/activities-history.module';
import { EnterpriseDetailModule , AdminDetailModule} from '@libera/shared';
import { AcceptProgramDialogModule } from '../../dialogs/accept-program-dialog/accept-program-dialog.module';
import { ConfirmRejectDialogModule } from '../../dialogs/confirm-reject/confirm-reject.dialog.module';
import { DetailPage } from './detail.page';
import { AddDocumentDialogModule } from '../../dialogs/add-document/add-document-dialog-module';
import { SendInvitationDialogModule } from '../../dialogs/send-invitation-dialog/send-invitation.dialog.module';
import { SendResolutionDialogModule } from '../../dialogs/send-resolution-dialog/send-resolution.dialog.module';
import { MatPaginatorModule, MatSnackBarModule, MatTabsModule } from '@angular/material';
import { FinancialConditionsTableModule } from '../../components/financial-conditions-table/financial-conditions-table.module';
import { CreateFinancialConditionsDialogModule } from '../../dialogs/create-financial-conditions-dialog/create-financial-conditions.dialog.module';
import { FilterPlanFormModule } from '../../components/filter-plan-form/filter-plan-form.module';

const COMMON_DECLARATIONS = [DetailPage];

const COMMON_IMPORTS = [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FlexLayoutModule,
    ReuploadFileDialogModule,
    AcceptProgramDialogModule,
    ConfirmRejectDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    EnterpriseInfoModule,
    EnterpriseDocumentationTableModule,
    StatusChipModule,
    EnterpriseDetailModule,
    EnterpriseFormModule,
    AdminDetailModule,
    TranslateModule,
    ActivitiesHistoryModule,
    AddDocumentDialogModule,
    SendInvitationDialogModule,
    SendResolutionDialogModule,
    MatTabsModule,
    MatPaginatorModule,
    FinancialConditionsTableModule,
    CreateFinancialConditionsDialogModule,
    FilterPlanFormModule,
    MatSnackBarModule,
    TranslateModule,
];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: [COMMON_IMPORTS],
    exports: COMMON_DECLARATIONS,
})
export class DetailPageModule { }

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
