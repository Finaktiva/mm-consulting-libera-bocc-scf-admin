import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LenderRequestsListComponent } from './pages/lender-requests-list/lender-requests-list.component';
import { LenderRequestsListModule } from './pages/lender-requests-list/lender-requests-list.module';
import { LinkedListComponent } from './pages/linked-list/linked-list.component';
import { LinkedListModule } from './pages/linked-list/linked-list.module';
import { LenderListPageModule } from './pages/list/list.module';
import { LenderListPage } from './pages/list/list.page';
import { QuotaRequestListPageModule } from './pages/quota-request-list/quota-request-list.module';
import { QuotaRequestListPage } from './pages/quota-request-list/quota-request-list.page';
import { RequestDetailPageModule } from './pages/request-detail/request-detail.module';
import { RequestDetailPage } from './pages/request-detail/request-detail.page';
import { RequestListPageModule } from './pages/request-list/request-list.module';
import { RequestListPage } from './pages/request-list/request-list.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LenderRequestsListComponent,
    },
    {
        path: 'requests',
        component: RequestListPage,
    },
    {
        path: 'requests/:id',
        component: RequestDetailPage,
    },
    {
        path: 'quota-requests',
        component: QuotaRequestListPage,
    },
    {
        path: 'linked',
        component: LinkedListComponent,
    },
    {
        path: 'available',
        component: LenderListPage,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        LenderListPageModule,
        RequestListPageModule,
        RequestDetailPageModule,
        QuotaRequestListPageModule,
        LinkedListModule,
        LenderRequestsListModule,
    ],
})
export class LenderRoutingModule {}
