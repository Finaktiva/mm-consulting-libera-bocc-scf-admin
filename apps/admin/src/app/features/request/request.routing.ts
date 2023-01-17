import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestLinkDetailModule } from './pages/link-detail/link-detail.module';
import { RequestLinkDetailPage } from './pages/link-detail/link-detail.page';
import { RequestLinkListModule } from './pages/link-list/link-list.module';
import { RequestLinkListPage } from './pages/link-list/link-list.page';
import { RequestModuleDetailModule } from './pages/module-detail/module-detail.module';
import { RequestModuleDetailPage } from './pages/module-detail/module-detail.page';
import { RequestModuleListModule } from './pages/module-list/module-list.module';
import { RequestModuleListPage } from './pages/module-list/module-list.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'modules',
    },
    {
        path: 'modules',
        // pathMatch: 'full',
        component: RequestModuleListPage,
        // canActivate: [RequestGuard],
    },
    {
        path: 'modules/:id',
        component: RequestModuleDetailPage,
    },
    {
        path: 'links',
        component: RequestLinkListPage,
    },
    {
        path: 'links/:id',
        component: RequestLinkDetailPage,
    },
    // {
    //     path: ':id',
    //     component: RequestDetailPage,
    // },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RequestModuleListModule,
        RequestLinkListModule,
        RequestModuleDetailModule,
        RequestLinkDetailModule,
    ],
})
export class RequestRoutingModule {}
