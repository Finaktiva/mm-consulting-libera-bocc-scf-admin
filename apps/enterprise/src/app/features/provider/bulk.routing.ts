import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProviderBulkCreateModule } from './pages/bulk-create/bulk-create.module';
import { ProviderBulkCreatePage } from './pages/bulk-create/bulk-create.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProviderBulkCreatePage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), ProviderBulkCreateModule],
})
export class ProviderBulkCreateRoutingModule {}
