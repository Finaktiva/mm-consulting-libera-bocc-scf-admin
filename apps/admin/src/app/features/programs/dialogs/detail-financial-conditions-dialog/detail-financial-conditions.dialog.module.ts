import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DetailFinancialConditionsDialog } from './detail-financial-conditions.dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CreateFinancialConditionsFormModule } from '../../components/create-financial-conditions-form/create-financial-conditions-form.module';
import { ConfirmPlanCommissionFormModule } from '../../components/confirm-plan-commission-form/confirm-plan-commission-form.module';
import { MatFormFieldModule, MatIconModule } from '@angular/material';
import { DetailFinancialConditionsFormModule } from '../../components/detail-financial-conditions-form/detail-financial-conditions-form.module';
import { ApproveFinancialDialogModule } from '../approve-financial-conditions-dialog/approve-financial-conditions-dialog.module';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    CreateFinancialConditionsFormModule,
    ConfirmPlanCommissionFormModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule,
    DetailFinancialConditionsFormModule,
    MatIconModule,
    ApproveFinancialDialogModule,
];

const COMMON_DECLARATIONS = [DetailFinancialConditionsDialog];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_IMPORTS,
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS,
})
export class DetailFinancialConditionsDialogModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
