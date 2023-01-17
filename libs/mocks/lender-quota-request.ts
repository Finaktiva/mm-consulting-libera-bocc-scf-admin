import { LenderQuotaRequest } from '../models/lender-quota-request';

export const LENDER_QUOTA_REQUEST_MOCK: LenderQuotaRequest = {
    id: 1,
    creationDate: '',
    grantedQuota: 100,
    lenderComments: 'Test',
    lender: {
        id: 45,
        enterpriseName: 'MM',
        nit: '123',
    },
    payerComments: 'ANOTHER TEST',
    rate: 1,
    rateType: 'ADVANCE_MONTH_RATE',
    requestType: 'PAYMENT',
    requestedQuota: 23,
    status: 'APPROVED',
};

export const LENDER_QUOTA_REQUEST_MOCKS: LenderQuotaRequest[] = [
    {
        id: 1,
        creationDate: new Date().toISOString(),
        grantedQuota: 100,
        lenderComments: 'Test',
        lender: {
            id: 45,
            enterpriseName: 'MM',
            nit: '123',
        },
        payerComments: 'ANOTHER TEST',
        rate: 1,
        rateType: 'ADVANCE_MONTH_RATE',
        requestType: 'PAYMENT',
        requestedQuota: 23,
        status: 'APPROVED',
    },
    {
        id: 2,
        creationDate: new Date().toISOString(),
        grantedQuota: 100,
        lenderComments: 'Test',
        lender: {
            id: 45,
            enterpriseName: 'MM',
            nit: '123',
        },
        payerComments: 'ANOTHER TEST',
        rate: 1,
        rateType: 'DUE_MONTH_RATE',
        requestType: 'AMOUNT_UPGRADE',
        requestedQuota: 23,
        status: 'PENDING_LENDER_APPROVAL',
    },
    {
        id: 3,
        creationDate: new Date().toISOString(),
        grantedQuota: 100,
        lenderComments: 'Test',
        lender: {
            id: 45,
            enterpriseName: 'MM',
            nit: '123',
        },
        payerComments: 'ANOTHER TEST',
        rate: 1,
        rateType: 'ADVANCE_MONTH_RATE',
        requestType: 'PAYMENT',
        requestedQuota: 23,
        status: 'PENDING_PAYER_APPROVAL',
    },
    {
        id: 4,
        creationDate: new Date().toISOString(),
        grantedQuota: 100,
        lenderComments: 'Test',
        lender: {
            id: 45,
            enterpriseName: 'MM',
            nit: '123',
        },
        payerComments: 'ANOTHER TEST',
        rate: 1,
        rateType: 'PREFERENTIAL_RATE',
        requestType: 'PAYMENT',
        requestedQuota: 23,
        status: 'REJECTED',
    },
];

export const QUOTA_REQUEST_MOCKS: LenderQuotaRequest = {
    id: 1,
    creationDate: '',
    grantedQuota: 100,
    lenderComments: 'Test',
    lender: {
        id: 45,
        enterpriseName: 'MM',
        nit: '123',
    },
    payerComments: 'ANOTHER TEST',
    rate: 1,
    rateType: 'ADVANCE_MONTH_RATE',
    requestType: 'PAYMENT',
    requestedQuota: 23,
    status: 'APPROVED',
};
