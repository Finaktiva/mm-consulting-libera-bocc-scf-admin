import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileLayout } from './layout/profile.layout';
import { ProfileLayoutModule } from './layout/profile.layout.module';
import { AccountModule } from './pages/account/account.module';
import { AccountPage } from './pages/account/account.page';
import { SecurityModule } from './pages/security/security.module';
import { SecurityPage } from './pages/security/security.page';

const routes: Routes = [
    {
        path: '',
        component: ProfileLayout,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AccountPage,
            },
            {
                path: 'security',
                component: SecurityPage,
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ProfileLayoutModule,
        AccountModule,
        SecurityModule,
    ],
})
export class ProfileRoutingModule {}
