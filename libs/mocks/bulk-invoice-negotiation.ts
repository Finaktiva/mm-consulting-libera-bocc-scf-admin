import {
    BulkInvoiceNegotiationDetail,
    PayerBulkInvoiceNegotiation,
    ProviderBulkInvoiceNegotiation,
} from '@libera/models/bulk-invoice-negotiation';

export const BULK_INVOICE_NEGOTIATION_DETAIL_MOCK: BulkInvoiceNegotiationDetail = {
    id: 8871,
    folio: '1112-ab',
    amount: 34433,
    amountInvoices: 3,
    creationDate: '2019-04-24T16:18:46.114Z',
    creationUser: 0,
    finishDate: '2019-04-24T16:18:46.114Z',
    provider: {
        id: 1,
        enterpriseName: 'Medio Melon',
    },
    status: 'NEGOTIATION_IN_PROGRESS',
    lender: {
        id: 2,
        availableQuota: 1000000000,
        enterpriseName: 'Company A',
    },
    negotiation: {
        status: 'PROVIDER_PENDING_RESPONSE',
        payerOffer: {
            discountValue: 35000,
            discountType: 'ANTICIPATED_MONTH_RATE',
            percentage: 5,
            discountDueDate: '2019-04-24T16:18:46.114Z',
            expectedPaymentDate: '2019-04-24T16:18:46.114Z',
        },
        providerOffer: {
            discountValue: 35000,
            discountType: 'ANTICIPATED_MONTH_RATE',
            percentage: 5,
            discountDueDate: '2019-04-24T16:18:46.114Z',
            expectedPaymentDate: '2019-04-24T16:18:46.114Z',
        },
    },
    invoices: [
        {
            id: 1,
            amount: 31100,
            currencyCode: 'MXN',
            expirationDate: '2019-04-24T16:18:46.114Z',
            emissionDate: '2019-04-24T16:18:46.114Z',
            invoiceNumber: '2',
            provider: {
                id: 33,
                enterpriseName: 'Company B',
            },
            nit: '123.123.123-2',
        },
        {
            id: 2,
            amount: 55980,
            currencyCode: 'MXN',
            expirationDate: '2019-04-24T16:18:46.114Z',
            emissionDate: '2019-04-24T16:18:46.114Z',
            invoiceNumber: '2-a',
            provider: {
                id: 33,
                enterpriseName: 'Company B',
            },
            nit: '123.123.123-2',
        },
        {
            id: 3,
            amount: 9090,
            currencyCode: 'MXN',
            expirationDate: '2019-04-24T16:18:46.114Z',
            emissionDate: '2019-04-24T16:18:46.114Z',
            invoiceNumber: '2-c',
            provider: {
                id: 33,
                enterpriseName: 'Company B',
            },
            nit: '123.123.123-2',
        },
    ],
};

export const PAYER_BULK_INVOICE_NEGOTIATION_MOCKS: PayerBulkInvoiceNegotiation[] = [
    {
        id: 998,
        amount: 67000,
        amountInvoices: 34,
        creationDate: '2019-04-24T16:18:46.114Z',
        creationUser: 0,
        finishDate: '2019-04-24T16:18:46.114Z',
        folio: 'abc-12',
        provider: {
            id: 1,
            enterpriseName: 'Medio Melon',
        },
        status: 'NEGOTIATION_APPROVED',
    },
    {
        id: 990,
        amount: 6107000,
        amountInvoices: 46,
        creationDate: '2019-04-24T16:18:46.114Z',
        creationUser: 0,
        finishDate: '2019-04-24T16:18:46.114Z',
        folio: '23-23-1a',
        provider: {
            id: 1,
            enterpriseName: 'Medio Melon',
        },
        status: 'NEGOTIATION_EXPIRED',
    },
    {
        id: 998991,
        amount: 72344,
        amountInvoices: 3,
        creationDate: '2019-04-24T16:18:46.114Z',
        creationUser: 0,
        finishDate: '2019-04-24T16:18:46.114Z',
        folio: 'zzz-12',
        provider: {
            id: 1,
            enterpriseName: 'Medio Melon',
        },
        status: 'NEGOTIATION_IN_PROGRESS',
    },
];

export const PROVIDER_BULK_INVOICE_NEGOTIATION_MOCKS: ProviderBulkInvoiceNegotiation[] = [
    {
        id: 998,
        amount: 67000,
        amountInvoices: 34,
        creationDate: '2019-04-24T16:18:46.114Z',
        folio: 'abc-12',
        payer: {
            id: 1,
            enterpriseName: 'Provider A',
        },
        status: 'NEGOTIATION_IN_PROGRESS',
    },
    {
        id: 990,
        amount: 6107000,
        amountInvoices: 46,
        creationDate: '2019-04-24T16:18:46.114Z',
        folio: '23-23-1a',
        payer: {
            id: 1,
            enterpriseName: 'PROVIDER B',
        },
        status: 'NEGOTIATION_IN_PROGRESS',
    },
    {
        id: 998991,
        amount: 72344,
        amountInvoices: 3,
        creationDate: '2019-04-24T16:18:46.114Z',
        folio: 'zzz-12',
        payer: {
            id: 1,
            enterpriseName: 'provider c',
        },
        status: 'NEGOTIATION_IN_PROGRESS',
    },
];
