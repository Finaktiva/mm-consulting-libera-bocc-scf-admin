import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpriseListStatus } from '@libera/models/enterprise';

import { ValidateStatusGuard } from '../../guards/validate-status.guard';
import { DetailPageModule } from './pages/detail/detail.module';
import { DetailPage } from './pages/detail/detail.page';
import { ListPageModule } from './pages/list/list.module';
import { ListPage } from './pages/list/list.page';

const routes: Routes = [
    // {
    //     path: 'enabled',
    //     component: ListPage,
    //     canActivate: [ValidateStatusGuard],
    //     data: {
    //         status: EnterpriseListStatus.ENABLED,
    //     },
    // },
    // {
    //     path: 'disabled',
    //     component: ListPage,
    //     canActivate: [ValidateStatusGuard],
    //     data: {
    //         status: EnterpriseListStatus.DISABLED,
    //     },
    // },
    // {
    //     path: 'request',
    //     component: ListPage,
    //     canActivate: [ValidateStatusGuard],
    //     data: {
    //         status: EnterpriseListStatus.REQUEST,
    //     },
    // },
    {
        path: '',
        pathMatch: 'full',
        component: ListPage,
    },
    {
        path: ':id',
        component: DetailPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), ListPageModule, DetailPageModule],
    exports: [RouterModule],
})
export class ProgramsRoutingModule {}
