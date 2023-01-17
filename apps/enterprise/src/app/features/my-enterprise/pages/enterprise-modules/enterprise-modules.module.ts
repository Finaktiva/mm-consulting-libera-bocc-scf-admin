import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ModuleTableModule } from '../../components/module-table/module-table.module';
import { DocumentationDialogModule } from '../../dialogs/documentation/documentation.dialog.module';
import { EnterpriseModulesPage } from './enterprise-modules.page';

const COMMON_IMPORTS = [
    CommonModule,
    ModuleTableModule,
    MatProgressBarModule,
    DocumentationDialogModule,
];

const COMMON_DECLARATIONS = [EnterpriseModulesPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class EnterpriseModulesModule {}
