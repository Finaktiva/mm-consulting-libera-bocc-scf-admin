import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateFinancialConditionsDialog } from './create-financial-conditions.dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CreateFinancialConditionsFormModule } from '../../components/create-financial-conditions-form/create-financial-conditions-form.module';
import { ConfirmPlanCommissionFormModule } from '../../components/confirm-plan-commission-form/confirm-plan-commission-form.module';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    CreateFinancialConditionsFormModule,
    ConfirmPlanCommissionFormModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [CreateFinancialConditionsDialog];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_IMPORTS,
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS,
})
export class CreateFinancialConditionsDialogModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
