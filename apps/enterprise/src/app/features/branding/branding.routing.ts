import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppearanceModule } from './pages/appearance/appearance.module';
import { AppearancePage } from './pages/appearance/appearance.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AppearancePage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), AppearanceModule],
})
export class BrandingRoutingModule {}
