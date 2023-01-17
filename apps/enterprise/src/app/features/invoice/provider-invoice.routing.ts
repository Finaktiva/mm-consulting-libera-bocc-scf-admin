import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProviderInvoiceLayout } from './layouts/provider-invoice/provider-invoice.layout';
import { ProviderInvoiceLayoutModule } from './layouts/provider-invoice/provider-invoice.layout.module';
import { PaymentRequestPageModule } from './pages/payment-request/payment-request.module';
import { PaymentRequestPage } from './pages/payment-request/payment-request.page';
import {
    ProviderBulkInvoiceNegotiationDetailPageModule,
} from './pages/provider-bulk-invoice-negotiation-detail/provider-bulk-invoice-negotiation-detail.module';
import {
    ProviderBulkInvoiceNegotiationDetailPage,
} from './pages/provider-bulk-invoice-negotiation-detail/provider-bulk-invoice-negotiation-detail.page';
import {
    ProviderBulkInvoiceNegotiationListPageModule,
} from './pages/provider-bulk-invoice-negotiation-list/provider-bulk-invoice-negotiation-list.module';
import {
    ProviderBulkInvoiceNegotiationListPage,
} from './pages/provider-bulk-invoice-negotiation-list/provider-bulk-invoice-negotiation-list.page';
import { ProviderInvoiceDetailPageModule } from './pages/provider-invoice-detail/provider-invoice-detail.module';
import { ProviderInvoiceDetailPage } from './pages/provider-invoice-detail/provider-invoice-detail.page';
import { ProviderInvoiceListModule } from './pages/provider-invoice-list/provider-invoice-list.module';
import { ProviderInvoiceListPage } from './pages/provider-invoice-list/provider-invoice-list.page';
import { ProviderNegotiationPage } from './pages/provider-negotiation/provider-negotiation.page';
import { ProviderNegotiationPageModule } from './pages/provider-negotiation/provider-negotiation.page.module';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProviderInvoiceListPage,
    },
    {
        path: 'bulk-negotiations',
        component: ProviderBulkInvoiceNegotiationListPage,
    },
    {
        path: 'bulk-negotiations/:id',
        component: ProviderBulkInvoiceNegotiationDetailPage,
    },
    {
        path: ':id',
        component: ProviderInvoiceLayout,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ProviderInvoiceDetailPage,
            },
            {
                path: 'negotiations',
                component: ProviderNegotiationPage,
            },
            {
                path: 'payment-requests',
                component: PaymentRequestPage,
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ProviderInvoiceListModule,
        ProviderInvoiceLayoutModule,
        ProviderInvoiceDetailPageModule,
        ProviderNegotiationPageModule,
        PaymentRequestPageModule,
        ProviderBulkInvoiceNegotiationListPageModule,
        ProviderBulkInvoiceNegotiationDetailPageModule,
    ],
})
export class ProviderInvoiceRoutingModule {}
