import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoiceLayout } from './layouts/invoice/invoice.layout';
import { InvoiceLayoutModule } from './layouts/invoice/invoice.layout.module';
import { InvoiceCreatePageModule } from './pages/create/invoice-create.module';
import { InvoiceCreatePage } from './pages/create/invoice-create.page';
import { CustomAttributeListPageModule } from './pages/custom-attribute-list/custom-attribute-list.module';
import { FundingRequestPageModule } from './pages/funding-request/funding-request.module';
import { FundingRequestPage } from './pages/funding-request/funding-request.page';
import { InvoiceDetailPageModule } from './pages/invoice-detail/invoice-detail.module';
import { InvoiceDetailPage } from './pages/invoice-detail/invoice-detail.page';
import { InvoiceListModule } from './pages/invoice-list/invoice-list.module';
import { InvoiceListPage } from './pages/invoice-list/invoice-list.page';
import { NegotiationPage } from './pages/negotiation/negotiation.page';
import { NegotiationPageModule } from './pages/negotiation/negotiation.page.module';
import {
    PayerBulkInvoiceNegotiationDetailPageModule,
} from './pages/payer-bulk-invoice-negotiation-detail/payer-bulk-invoice-negotiation-detail.module';
import {
    PayerBulkInvoiceNegotiationDetailPage,
} from './pages/payer-bulk-invoice-negotiation-detail/payer-bulk-invoice-negotiation-detail.page';
import {
    PayerBulkInvoiceNegotiationListPageModule,
} from './pages/payer-bulk-invoice-negotiation-list/payer-bulk-invoice-negotiation-list.module';
import {
    PayerBulkInvoiceNegotiationListPage,
} from './pages/payer-bulk-invoice-negotiation-list/payer-bulk-invoice-negotiation-list.page';
import { PaymentRequestPageModule } from './pages/payment-request/payment-request.module';
import { PaymentRequestPage } from './pages/payment-request/payment-request.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: InvoiceListPage,
    },
    {
        path: 'create',
        component: InvoiceCreatePage,
    },
    {
        path: 'bulk-negotiations',
        component: PayerBulkInvoiceNegotiationListPage,
    },
    {
        path: 'bulk-negotiations/:id',
        component: PayerBulkInvoiceNegotiationDetailPage,
    },
    {
        path: ':id',
        component: InvoiceLayout,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: InvoiceDetailPage,
            },
            {
                path: 'negotiations',
                component: NegotiationPage,
            },
            {
                path: 'funding-requests',
                component: FundingRequestPage,
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
        InvoiceListModule,
        InvoiceCreatePageModule,
        CustomAttributeListPageModule,
        InvoiceLayoutModule,
        InvoiceDetailPageModule,
        NegotiationPageModule,
        FundingRequestPageModule,
        PaymentRequestPageModule,
        PayerBulkInvoiceNegotiationListPageModule,
        PayerBulkInvoiceNegotiationDetailPageModule,
    ],
})
export class PayerInvoiceRoutingModule {}
