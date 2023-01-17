import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BulkListPageModule } from './pages/bulk-list/bulk-list.module';
import { BulkListPage } from './pages/bulk-list/bulk-list.page';
import { BulkLoadPageModule } from './pages/bulk-load/bulk-load.module';
import { BulkLoadPage } from './pages/bulk-load/bulk-load.page';
import { CustomAttributeListPageModule } from './pages/custom-attribute-list/custom-attribute-list.module';
import { CustomAttributeListPage } from './pages/custom-attribute-list/custom-attribute-list.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'custom-attributes',
    },
    {
        path: 'bulk',
        component: BulkListPage,
    },
    {
        path: 'bulk-load',
        component: BulkLoadPage,
    },
    {
        path: 'custom-attributes',
        component: CustomAttributeListPage,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        BulkListPageModule,
        BulkLoadPageModule,
        CustomAttributeListPageModule,
    ],
})
export class InvoiceRoutingModule {}
