import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProviderBulkListModule } from './pages/bulk-list/bulk-list.module';
import { ProviderBulkListPage } from './pages/bulk-list/bulk-list.page';
import { ProviderListPageModule } from './pages/list/list.module';
import { ProviderListPage } from './pages/list/list.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProviderListPage,
    },
    {
        path: 'bulk',
        component: ProviderBulkListPage,
    },
    {
        path: 'bulk/create',
        loadChildren: () =>
            import('./bulk.routing').then(
                m => m.ProviderBulkCreateRoutingModule
            ),
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ProviderListPageModule,
        ProviderBulkListModule,
    ],
})
export class ProviderRoutingModule {}
