import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EnterpriseDocumentationTableModule } from '@libera/shared';

import { FinancialConditionsPage } from './financial-conditions.page';
import { TranslateModule } from '@ngx-translate/core';
import { FinancialConditionsTableModule } from '../../components/financial-conditions-table/financial-conditions-table.module';
import { MatPaginatorModule } from '@angular/material';
import { FilterPlanFormModule } from '../../components/filter-plan-form/filter-plan-form.module';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatProgressBarModule,
    EnterpriseDocumentationTableModule,
    TranslateModule,
    FinancialConditionsTableModule,
    MatPaginatorModule,
    FilterPlanFormModule,
];

const COMMON_DECLARATIONS = [FinancialConditionsPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class FinancialConditionsModule { }
