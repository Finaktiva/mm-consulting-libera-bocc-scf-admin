import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicInformationModule } from './pages/basic-information/basic-information.module';
import { BasicInformationPage } from './pages/basic-information/basic-information.page';
import { DocumentationModule } from './pages/documentation/documentation.module';
import { DocumentationPage } from './pages/documentation/documentation.page';
import { FinancialConditionsModule } from './pages/financial-conditions/financial-conditions.module';
import { FinancialConditionsPage } from './pages/financial-conditions/financial-conditions.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: BasicInformationPage,
    },
    {
        path: 'financial-conditions',
        component: FinancialConditionsPage,
    },
    {
        path: 'documentation',
        component: DocumentationPage,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        BasicInformationModule,
        DocumentationModule,
        FinancialConditionsModule,
    ],
})
export class MyEnterpriseRoutingModule {}
