import {
    Lender,
    LenderCustomAttribute,
    LenderInvoice,
    LenderInvoiceDetail,
    LinkedLender,
} from '@libera/models/lender';

export const LENDER_INVOICE_MOCKS: LenderInvoice[] = [
    {
        amount: 90000,
        creationDate: '',
        creationUser: 0,
        currencyCode: 'MXN',
        discountDueDate: '',
        discountPercentage: 30,
        discountValue: 50000,
        effectivePaymentDate: '',
        expirationDate: '',
        finishedDate: '',
        invoiceId: 50,
        invoiceNumber: '34-a',
        invoiceStatus: 'FUNDING_IN_PROGRESS',
        payer: {
            enterpriseName: 'Medio melon',
            id: 10,
            nit: '800',
        },
        startingDate: '',
        status: 'LENDER_PAYMENT_CONFIRMATION',
    },
];

export const LENDER_INVOICE_DETAIL_MOCK: LenderInvoiceDetail = {
    invoiceId: 999,
    amount: 90000,
    currencyCode: 'MXN',
    discountDays: 9,
    discountValue: 55000,
    emissionDate: '2019-04-24T16:18:46.114Z',
    fundStatus: 'PENDING_LENDER_PAYMENT_CONFIRMATION',
    invoiceNumber: '23-a',
    requestId: 17,
    payer: {
        id: 10,
        enterpriseName: 'facebook',
        nit: '123',
    },
    provider: {
        id: 12,
        enterpriseName: 'google',
        nit: '345',
    },
    payment: {
        paymentDocumentation: [
            {
                filename: 'file.xslx',
                url:
                    'https://source.android.com/security/reports/Google_Android_Security_2018_Report_Final.pdf',
            },
        ],
        paymentInstruction: 'Lorem ipsum',
    },
};

export const LENDER_MOCKS: Lender[] = [
    {
        id: 98,
        enterpriseName: 'Medio melon',
        nit: '934.343.232-2',
        owner: {
            id: 9992,
            email: 'mm@gmail.com',
            name: 'ecar',
            firstSurname: 'ecarin',
            secondSurname: 'tester',
        },
    },
    {
        id: 198,
        enterpriseName: 'Empresa test',
        nit: '114.343.232-1',
        owner: {
            id: 9992,
            email: 'mm@gmail.com',
            name: 'ecar',
            firstSurname: 'ecarin',
            secondSurname: 'tester',
        },
    },
];

export const LINKED_LENDER_MOCKS: LinkedLender[] = [
    {
        id: 1,
        nit: '100.100.100-1',
        enterpriseName: 'Mediomelon',
        availableQuota: 10,
        grantedQuota: 6,
        rate: 16,
    },
    {
        id: 2,
        nit: '100.100.100-2',
        enterpriseName: 'Fud',
        availableQuota: 11,
        grantedQuota: 4,
        rate: 10,
    },
    {
        id: 3,
        nit: '100.100.100-3',
        enterpriseName: 'Stevia',
        availableQuota: 20,
        grantedQuota: 12,
        rate: 23,
    },
];

export const CUSTOM_ATTRIBUTES_MOCK: LenderCustomAttribute[] = [
    {
        name: 'Nombre Judicial',
        id: 1,
        type: 'TEXT',
        creationDate: new Date(),
        attributeId: '1',
    },
    {
        name: 'Fecha Registro Federal',
        id: 2,
        type: 'DATE',
        creationDate: new Date('2019-10-11T21:47:16.000Z'),
        attributeId: '100',
    },
    {
        name: 'CÃ³digo JurisdicciÃ³n',
        id: 3,
        type: 'TEXT',
        creationDate: new Date('2019-10-11T21:47:42.000Z'),
        attributeId: '100',
    },
    {
        name: 'Moneda Estandar',
        id: 4,
        type: 'CURRENCY',
        creationDate: new Date('2019-10-11T21:47:51.000Z'),
        attributeId: '100',
    },
    {
        name: 'Sexo',
        id: 5,
        type: 'RADIO',
        creationDate: new Date('2019-10-11T21:48:43.000Z'),
        attributeId: '100',
        options: [
            { id: 1, value: 'Masculino' },
            { id: 2, value: 'Femenino' },
            { id: 3, value: 'Sin especificar' },
        ],
    },
    {
        name: 'Insumos',
        id: 6,
        type: 'CHECKBOX',
        creationDate: new Date('2019-10-11T21:49:59.000Z'),
        attributeId: '100',
        options: [{ id: 4, value: 'Fijos' }, { id: 5, value: 'Variables' }],
    },
    {
        name: 'Numero Empleadores',
        id: 7,
        type: 'INTEGER',
        creationDate: new Date('2019-10-11T21:50:26.000Z'),
        attributeId: '100',
    },
    {
        name: 'Indice Ingresos Anuales',
        id: 8,
        type: 'DECIMAL',
        creationDate: new Date('2019-10-11T21:50:49.000Z'),
        attributeId: '100',
    },
];
