import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomAttributesPageModule } from './pages/custom-attributes/custom-attributes.module';
import { CustomAttributesPage } from './pages/custom-attributes/custom-attributes.page';
import { PayerListModule } from './pages/list/payer-list.module';
import { PayerListPage } from './pages/list/payer-list.page';
import { DetailModule } from './pages/detail/detail.module';
import { DetailComponent } from './pages/detail/detail.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PayerListPage,
    },
    {
        path: 'custom-attributes',
        component: CustomAttributesPage,
    },
    {
        path: ':id',
        component: DetailComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        PayerListModule,
        CustomAttributesPageModule,
        DetailModule,
    ],
})
export class PayerRoutingModule {}
