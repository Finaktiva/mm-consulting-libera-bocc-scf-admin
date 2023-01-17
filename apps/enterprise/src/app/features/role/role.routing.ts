import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleLayout } from './layout/role.layout';
import { RoleLayoutModule } from './layout/role.layout.module';
import { RoleSelectorModule } from './pages/role-selector/role-selector.module';
import { RoleSelectorPage } from './pages/role-selector/role-selector.page';

const routes: Routes = [
    {
        path: '',
        component: RoleLayout,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: RoleSelectorPage,
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RoleLayoutModule,
        RoleSelectorModule,
    ],
})
export class RoleRoutingModule {}
